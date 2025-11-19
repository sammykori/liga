self.addEventListener("push", function (event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: data.icon || "/apple-touch-icon.png",
            badge: "/apple-touch-icon.png",
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: "2",
                url: data.link || "/notifications",
            },
        };
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

self.addEventListener("notificationclick", function (event) {
    console.log("Notification click received.");
    console.log(process.env.APP_URL);
    event.notification.close();
    const urlToOpen = event.notification.data.url; // Retrieve the URL

    if (urlToOpen) {
        // Open the window and focus on it
        event.waitUntil(
            clients.openWindow(`https://localhost:3000${urlToOpen}`)
        );
    }
    // event.waitUntil(clients.openWindow(process.env.APP_URL));
});
