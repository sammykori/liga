This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Test Edge Function for send-push-notifications

npx supabase functions deploy send-push-notifications

curl -L -X POST 'https://jkpwiprizwwfzqaavnbh.supabase.co/functions/v1/send-push-notifications' \  
 -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprcHdpcHJpend3ZnpxYWF2bmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDAyMzcsImV4cCI6MjA3NDI3NjIzN30.vN6sDLYN9lXCV4SJtO5TSf-LO3TfzPvjTeyvBaCprqE' \
 -H 'Content-Type: application/json' \  
 --data '{  
 "schema": "public",
"table": "notifications",
"commit_timestamp": "2025-11-16T15:16:42.278Z",
"eventType": "UPDATE",  
 "new": {  
 "id": "0e9fa539-0acc-418d-a033-f03cfbc89778",  
 "link": "/match/beafa341-f124-437c-9f01-08f175a5decd",
"read": true,
"type": "match",
"title": "Match Updated",  
 "message": "The match in your group has been updated!",
"user_id": "27ebf3a3-8db4-4549-a42d-03c3c5d331f7",
"group_id": "1a748679-8183-4ce3-9f51-b44bdc9d048c",  
 "created_at": "2025-10-09T09:39:59.667752+00:00"  
 },  
 "old": {  
 "id": "0e9fa539-0acc-418d-a033-f03cfbc89778"
},  
 "errors": null  
}'
