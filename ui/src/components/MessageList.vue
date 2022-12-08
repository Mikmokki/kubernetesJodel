<template>
	<form class="instructions" @submit="handleSubmit">
		<label>Message: </label>
		<input v-model="messageText"/>
		<button submit >Send Message</button>
	</form>
	<ul role="list" class="link-card-grid" ref="scrollComponent">
		<MessageListItem v-for="message in messages"
			:key="message.id"
			:message="message"
		/>
	   
	</ul>
	</template>
	<script setup lang="ts">
	import { ref,onMounted, onUnmounted } from 'vue';
	import MessageListItem from './MessageListItem.vue';

	export interface Message {
	id: number,
	messagetext: string,
	timestamp: string,
	score: number,
	token: string,
	}
	const scrollComponent=ref()
	const messages=ref<Message[]>([])
	const fetchMessages =async(offset:number)=>{
		const res = await fetch(`/api/messages?offset=${offset}`)
		const arr = await res.json() 
		messages.value=messages.value.concat(arr)
	}
	onMounted(async()=>{
		await fetchMessages(messages.value.length)
		window.addEventListener("scroll",handleScroll)
	})
	onUnmounted(()=>{
		window.removeEventListener("scroll",handleScroll)
	})
	const handleScroll = (e)=>{
		let element = scrollComponent.value
		if(element.getBoundingClientRect().bottom<window.innerHeight){
			console.log(":D",messages.value.length)
			fetchMessages(messages.value.length)
		}
	}
	const messageText=ref("")

	const handleSubmit=async(e:Event)=>{
		e.preventDefault()
		const message = JSON.stringify({messagetext:messageText.value,token:localStorage.getItem("token")})
 		const res = await fetch('/api/messages', {
  		method: 'POST', 
  		headers: {
    	'Content-Type': 'application/json',
  		},
  		body: message,
		})
		messageText.value=""
	}

	var url = new URL('/api/socket', window.location.href);
	url.protocol = url.protocol.replace('http', 'ws');
	url.href
	const ws = new WebSocket(url);
	ws.onopen = () => console.log(`Connected to server`);
	ws.onmessage = async (m) => {
  	const msg =  JSON.parse(m.data)
  	if(msg?.newEntry){
		messages.value=[msg.message,...messages.value]
		return
	}  
		const index = messages.value.findIndex(m=>m.id===msg.message.id)
		if (index===-1) return
		Object.assign(messages.value[index], msg.message) 
	};
	ws.onclose = () => console.log("Disconnected from server");
// 	import { Connection,connect } from 'amqplib-as-promised'

// const connection = await connect();

// const channel = await connection.openChannel();


// const queueName = "my.queue";
// await channel.declareQueue({ queue: queueName });
// await channel.consume(
//   { queue: queueName },
//   async (args, props, data) => {
//     console.log(JSON.stringify(args));
//     console.log(JSON.stringify(props));
//     console.log(new TextDecoder().decode(data));
//     await channel.ack({ deliveryTag: args.deliveryTag });
//   },
// );


	</script>
	<style>
		.link-card-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit);
			gap: 1rem;
			padding: 0;
		}
		.instructions {
			line-height: 1.6;
			margin: 1rem 0;
			border: 1px solid rgba(var(--accent), 25%);
			background-color: white;
			padding: 1rem;
			border-radius: 0.4rem;
		}
	</style>
	