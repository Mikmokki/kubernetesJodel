import http from "k6/http";
export const options = {
    duration: '10s',
    vus: 100,
    summaryTrendStats: ["avg","min","med","p(95)","p(99)"]
}

export default ()=> {
    http.get('http://host.docker.internal:7800/api/messages/1');
    http.get('http://host.docker.internal:7800/api/messages/1/replies');
}