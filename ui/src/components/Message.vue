<template>
  
    <a href="/">Back to messages</a>
    <br>
    <div class="link-card-grid">
    <div v-if="message" class="link-card">		<h2>
			{{message.timestamp}}
			<span>&rarr;</span>
		</h2>
		<p>
			{{message.token}}
		</p>
		<p>
			{{message.messagetext}} {{message.score}}
		</p></div>
	<form class="instructions" @submit="handleSubmit">
		<label>Reply Message: </label>
		<input v-model="replyText"/>
		<button submit >Reply</button>
	</form>
	<ul role="list" class="link-card-grid">
		<Reply v-for="reply in replies"
			:key="message.id"
			:reply="reply"
		/>
	</ul>
</div> 

	</template>
	<script setup lang="ts">
	import { ref,onMounted } from 'vue';
	import Reply from './Reply.vue';
    const props = defineProps<{messageid: number}>()
	const message=ref<Message>()
    const replies=ref<Message>([])
	const fetchReplies = async ()=>{
		const res = await fetch(`/api/messages/${props.messageid}/replies`)
		replies.value = await res.json() 
	}
	onMounted(async()=>{
        const res = await fetch(`/api/messages/${props.messageid}`)
		message.value = await res.json() 
		await fetchReplies()
	})
	const replyText=ref("")

	const handleSubmit=async(e:Event)=>{
		e.preventDefault()
		const reply = JSON.stringify({replytext:replyText.value,token:localStorage.getItem("token")})
 		await fetch(`/api/messages/${props.messageid}/replies`, {
  		method: 'POST', 
  		headers: {
    	'Content-Type': 'application/json',
  		},
  		body: reply,
	})
	replyText.value=""
	fetchReplies()
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
			border: 1px solid rgba("FFF", 25%);
			background-color: white;
			padding: 1rem;
			border-radius: 0.4rem;
		}

	.link-card {
		width: 100%;
		text-decoration: none;
		line-height: 1.4;
		padding: 1rem 1.3rem;
		border-radius: 0.35rem;
		color: #111;
		background-color: white;
		opacity: 0.8;
	}
    .link-card-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit);
			gap: 1rem;
			padding: 0;
		}
	</style>
	