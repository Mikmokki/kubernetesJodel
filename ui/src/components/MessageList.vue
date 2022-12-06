<template>
	<form class="instructions" @submit="handleSubmit">
		<label>Message: </label>
		<input v-model="messageText"/>
		<button submit >Send Message</button>
	</form>
	<ul role="list" class="link-card-grid">
		<MessageListItem v-for="message in messages"
			:key="message.id"
			:message="message"
		/>
	   
	</ul>
	</template>
	<script setup lang="ts">
	import { ref,onMounted } from 'vue';
	import MessageListItem from './MessageListItem.vue';
	interface Message {
	id: number,
	messagetext: string,
	timestamp: string,
	score: number,
	token: string,
	}
	const messages=ref<Message[]>([])
	const fetchMessages =async(offset)=>{
		const res = await fetch(`/api/messages?offset=${offset}`)
		const arr = await res.json() 
		// messages.value=messages.value.concat(arr)
		messages.value=(arr)
	}
	onMounted(async()=>{
		await fetchMessages(messages.value.length)
	})
	const messageText=ref("")

	const handleSubmit=async(e:Event)=>{
		e.preventDefault()
		const message = JSON.stringify({messagetext:messageText.value,token:localStorage.getItem("token")})
 		await fetch('/api/messages', {
  		method: 'POST', 
  		headers: {
    	'Content-Type': 'application/json',
  		},
  		body: message,
	})
	messageText.value=""
	fetchMessages(0)
	}
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
	