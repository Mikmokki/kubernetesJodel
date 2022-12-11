# Project 3 report

Write the project report here. Do not include your personal details (e.g. name or student number).

## Overview
This project is a jodel-like application that consist of astro frontend, deno oak backend and can be run on docker and kubernetes. On the app there are messages that will be send via web sockets. With kubernetes, the server scales with by the usage. The project should have all requirements done except "Note! This must work also in the situation where there are multiple application
server pods. Consider using a separate messaging service to achieve the desired
outcome." As I was not using message services. Kafka and RabbitMQ were considered to improve it further.

## How to use
Run docker from the root folder with command: sudo docker-compose up --build
The project can be run on http://localhost:7800/ with docker running

## For testing the project
1. Run the program with sudo docker-compose up --build
2. Open second terminal and go to tests folder
2. use the commands below

sudo docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <mainPost.js;
sudo docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <main.js; 
sudo docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <messagePost.js;
sudo docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <message.js;

## Core Web Vitals tests with Google Lighthouse
I ran Google Lighthouse on both main page and on message page with couple of messages/replies.
Main Page took more to load and got the following scores.

Performance 100
Accessibility 89
Best Practises 100
SEO 89

First Contentful Paint 0.5 s
Time to Interactive 0.9 s
Speed Index 0.5 s
Total Blocking Time 10 ms
Largest Contentful Paint 0.5 s
Cumulative Layout Shift 0

The exercise page got following scores.
Performance 96
Accessibility 89
Best Practises 100
SEO 89

First Contentful Paint 0.5 s
Time to Interactive 0.9 s
Speed Index 0.5 s
Total Blocking Time 30 ms
Largest Contentful Paint 1.4 s
Cumulative Layout Shift 0.004

Both of the pages have great scores overall and that is propably due to the technologies used. There are not a lot javascript animations on the page that would slow the page down.
Also, using Astro with server side rendering, the browser does not have to load that much Javascript. The app is also quite simple with only a bit of looping over components.
Also the fact that max 20 messages are loaded at the start helps with the performance.

## K6 performance tests
I tested grade submission, main page and message page loads under a load of 10 seconds with 100 concurrent users.

Main Page with post:

    data_received..................: 3.0 MB 302 kB/s
    data_sent......................: 1.7 MB 169 kB/s
    http_req_blocked...............: avg=402.56µs min=900ns   med=3.2µs    p(95)=33.03µs  p(99)=5.59ms
    http_req_connecting............: avg=377.11µs min=0s      med=0s       p(95)=0s       p(99)=0s
    http_req_duration..............: avg=94.33ms  min=18.03ms med=91.63ms  p(95)=126.86ms p(99)=146.92ms
      { expected_response:true }...: avg=94.33ms  min=18.03ms med=91.63ms  p(95)=126.86ms p(99)=146.92ms   
    http_req_failed................: 0.00%  ✓ 0           ✗ 10554
    http_req_receiving.............: avg=283.06µs min=9µs     med=57.3µs   p(95)=1.04ms   p(99)=3.89ms
    http_req_sending...............: avg=118.48µs min=6µs     med=17.8µs   p(95)=341.17µs p(99)=1.78ms
    http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       p(95)=0s       p(99)=0s
    http_req_waiting...............: avg=93.93ms  min=17.98ms med=91.29ms  p(95)=126.37ms p(99)=146.22ms
    http_reqs......................: 10554  1045.362513/s
    iteration_duration.............: avg=190.43ms min=92.94ms med=185.22ms p(95)=247ms    p(99)=288.58ms
    iterations.....................: 5277   522.681256/s
    vus............................: 100    min=100       max=100
    vus_max........................: 100    min=100       max=100 

Main Page:

    data_received..................: 6.3 MB 627 kB/s
    data_sent......................: 1.6 MB 158 kB/s
    http_req_blocked...............: avg=348.54µs min=800ns   med=2.5µs   p(95)=16.4µs   p(99)=743.64µs
    http_req_connecting............: avg=329.55µs min=0s      med=0s      p(95)=0s       p(99)=0s
    http_req_duration..............: avg=69.57ms  min=22.86ms med=65.92ms p(95)=98.67ms  p(99)=146.18ms
      { expected_response:true }...: avg=69.57ms  min=22.86ms med=65.92ms p(95)=98.67ms  p(99)=146.18ms
    http_req_failed................: 0.00%  ✓ 0           ✗ 14299
    http_req_receiving.............: avg=263.18µs min=10.2µs  med=44µs    p(95)=938.4µs  p(99)=3.95ms
    http_req_sending...............: avg=84.31µs  min=5.4µs   med=12.3µs  p(95)=248.41µs p(99)=1.42ms
    http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      p(95)=0s       p(99)=0s
    http_req_waiting...............: avg=69.22ms  min=22.81ms med=65.6ms  p(95)=97.91ms  p(99)=145.91ms
    http_reqs......................: 14299  1412.616524/s
    iteration_duration.............: avg=70.29ms  min=22.95ms med=66.43ms p(95)=101.03ms p(99)=149.26ms
    iterations.....................: 14299  1412.616524/s
    vus............................: 100    min=100       max=100
    vus_max........................: 100    min=100       max=100  

Message Page with post:

     data_received..................: 2.8 MB 273 kB/s
     data_sent......................: 1.9 MB 185 kB/s
     http_req_blocked...............: avg=365.48µs min=900ns    med=2.7µs    p(95)=16.5µs   p(99)=895.99µs
     http_req_connecting............: avg=350.03µs min=0s       med=0s       p(95)=0s       p(99)=0s
     http_req_duration..............: avg=77.4ms   min=10.17ms  med=75.16ms  p(95)=103.9ms  p(99)=126.36ms
       { expected_response:true }...: avg=77.4ms   min=10.17ms  med=75.16ms  p(95)=103.9ms  p(99)=126.36ms
     http_req_failed................: 0.00%  ✓ 0           ✗ 12867
     http_req_receiving.............: avg=241.73µs min=9.6µs    med=47.1µs   p(95)=857.67µs p(99)=3.53ms
     http_req_sending...............: avg=93.76µs  min=5.5µs    med=14.4µs   p(95)=314.5µs  p(99)=1.84ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=77.06ms  min=9.35ms   med=74.86ms  p(95)=103.47ms p(99)=123.25ms
     http_reqs......................: 12867  1273.037608/s
     iteration_duration.............: avg=234.45ms min=119.75ms med=229.45ms p(95)=290.89ms p(99)=334.46ms
     iterations.....................: 4289   424.345869/s
     vus............................: 100    min=100       max=100
     vus_max........................: 100    min=100       max=100

Message Page with post:

    data_received..................: 3.5 MB 350 kB/s
    data_sent......................: 1.5 MB 150 kB/s
    http_req_blocked...............: avg=402.37µs min=800ns   med=2.6µs    p(95)=19.28µs  p(99)=978.44µs
    http_req_connecting............: avg=383.92µs min=0s      med=0s       p(95)=0s       p(99)=0s
    http_req_duration..............: avg=71.68ms  min=19.03ms med=68.83ms  p(95)=108.25ms p(99)=125.85ms
      { expected_response:true }...: avg=71.68ms  min=19.03ms med=68.83ms  p(95)=108.25ms p(99)=125.85ms
    http_req_failed................: 0.00%  ✓ 0           ✗ 13824
    http_req_receiving.............: avg=308.28µs min=11.7µs  med=45.6µs   p(95)=1.09ms   p(99)=4.69ms
    http_req_sending...............: avg=98.25µs  min=5.1µs   med=12.5µs   p(95)=242.2µs  p(99)=1.68ms
    http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       p(95)=0s       p(99)=0s
    http_req_waiting...............: avg=71.28ms  min=18.7ms  med=68.44ms  p(95)=107.57ms p(99)=124.94ms
    http_reqs......................: 13824  1373.492585/s
    iteration_duration.............: avg=145ms    min=63.45ms med=139.88ms p(95)=205.88ms p(99)=235.68ms
    iterations.....................: 6912   686.746292/s
    vus............................: 100    min=100       max=100
    vus_max........................: 100    min=100       max=100     


Overall, all of the four endpoints handled the load quite well. Average requests per second varied between 1000-1400 req/s.
That is reasonable time and from it is able to predict that the server would handle more load and therefore would scale well.
The average request duration varied between 69 and 94 that is still quite fast and does not disturb user experience.
Same can be said with the worst p(99) result that was found on main page post request with the time of 146.92ms. All in all very promising results for a online message page.

## Guidelines for deploying the application on Kubernetes
1. have minikube
2. enable ingress in minikube: ``minikube addons enable ingress``
3. Run the following command: ``kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.18/releases/cnpg-1.18.0.yaml``
4. Create minikube tunnel: minikube tunnel (note that this creates a running process so you'll want to run this separately)
5. build the images for api, ui and flyway, e.g. ``minikube image build -t api .`` 
when in the folder ui. However with you use the command ``minikube image build -t ui . Dockerfile.prod``
6. First deploy the database: ``kubectl apply -f kubernetes/config.yaml``
7. Then the rest: ``kubectl apply -f kubernetes/my-api.yaml,kubernetes/my-api-service.yaml,kubernetes/my-ui.yaml,kubernetes/my-ui-service.yaml,kubernetes/my-app-nginx-ingress.yaml``
8. The address can be found from the ingress section of minikube dashboard that can be opened with ``minikube dashboard``.
9. To scale the server based on cpu-usage ``kubectl autoscale deployment/api-app --min=2 --max=4 --cpu-percent=50     ``
## Performance improvements for future
As I previously stated, The overall performance was quite good as I only fetched 20 most recend messages and only loaded more when the user scrolled to the bottom of the page(infinite scrolling). The main consern is the lack of message system such as Kafka or RabbitMQ. With one of those included I could have fixed a problem where two server pods are having different information due to using distributed system on Kubernetes. Locally with docker that is not the case as there is only one server instance. Additional improvement would be to build frontend instead of running development mode on kubernetes. Also one possible way to increase performance could be to benchmark and compare different frameworks both on frontend, backend and message systems.
