// declare let self: ServiceWorkerGlobalScope;

self.addEventListener('message', (event) => {
  console.log(event?.data);
});

self.addEventListener('periodicsync', (event) => {
  console.log(event);
});



export {};
