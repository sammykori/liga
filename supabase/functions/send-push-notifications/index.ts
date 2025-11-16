// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as webpush from "jsr:@negrel/webpush";
// Initialize Supabase client
const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
// 1. Load the raw strings from the environment (secrets)
// 1. Load the raw Base64url strings from Supabase secrets
const rawVapidKeys = {
  "publicKey": {
    "kty": "EC",
    "crv": "P-256",
    "alg": "ES256",
    "x": "BwaTi1wOQnyrOvhz5ZwnQf9sjTH1-EYhJhWGCOIzV3c",
    "y": "gid1oI2IHLyvqDJAJdF_DYwZtyP8T8gYYCMQSGwxbF0",
    "key_ops": [
      "verify"
    ],
    "ext": true
  },
  "privateKey": {
    "kty": "EC",
    "crv": "P-256",
    "alg": "ES256",
    "x": "BwaTi1wOQnyrOvhz5ZwnQf9sjTH1-EYhJhWGCOIzV3c",
    "y": "gid1oI2IHLyvqDJAJdF_DYwZtyP8T8gYYCMQSGwxbF0",
    "d": "BGxW6D7K7cytgFy8-eZm38UvcOTQ9bm_ziBkbBE3kWM",
    "key_ops": [
      "sign"
    ],
    "ext": true
  }
}

Deno.serve(async (req)=>{
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "https://localhost:3000"); // or "*" for testing
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  // Preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers
    });
  }
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers
    });
  }
  const payload = await req.json();
  try {
    // The event payload from Supabase
    console.log(payload);
    const newNotification = payload.new;
    if (!newNotification) {
      return new Response(JSON.stringify({
        success: false,
        error: `No notification data ${payload}`
      }), {
        status: 400
      });
    }
    const { user_id, title, message, link } = newNotification;
    // Fetch all subscriptions for this user
    const { data: subscriptions, error } = await supabase.from("push_subscriptions").select("*").eq("user_id", user_id);
    if (error) throw error;
    if (!subscriptions || subscriptions.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        msg: "No subscriptions found"
      }), {
        status: 404,
        headers
      });
    }
    // 2. Import the keys: This converts the Base64url strings into CryptoKey objects 
    const importedKeys = await webpush.importVapidKeys(rawVapidKeys);
    // 3. Initialize the ApplicationServer
    const server = await webpush.ApplicationServer.new({
      contactInformation: `mailto:sammykori72@gmail.com`,
      vapidKeys: importedKeys
    });
    // Send notification to each subscription
    for (const sub of subscriptions){
      try {
        const subscriber = server.subscribe({
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        });
        await subscriber.pushTextMessage(JSON.stringify({
          title,
          message,
          link
        }), {
          ttl: 3600
        });
      } catch (err) {
        console.error("Failed to send push to", sub.endpoint, err);
        // Optional: delete invalid subscriptions
        if (err.statusCode === 410 || err.statusCode === 404) {
          await supabase.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
        }
      }
    }
    return new Response(JSON.stringify({
      success: true
    }), {
      status: 200,
      headers
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message,
      payload: payload
    }), {
      status: 500,
      headers
    });
  }
});
