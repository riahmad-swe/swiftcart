## ❓ JavaScript Questions & Answers

---

### 1. What's the difference between `null` and `undefined`?

undefined মানে বুঝায় যে একটা ভ্যারিয়েবল বা প্রপার্টির কোনো ভ্যালু নাই। বা সে ভ্যারিয়েবল/প্রপার্টি বিদ্যমান না। কোনো ভ্যালু ছাড়া ভ্যারিয়েবল ডিক্লেয়ার করলে সেটা undefined দেয়।

উদাহরণ:

```js
let x;
console.log(x);
// Output: undefined
```

null মানে বুঝায় সেই ভ্যারিয়েবলের/প্রপার্টির ভ্যালু ফাঁকা। মেমোরিতে সেই ভ্যারিয়েবলের ভ্যালু বিদ্যমান, কিন্তু ভ্যালু হচ্ছে কিছু না/ফাঁকা। এইটা ইচ্ছাকৃতভাবে ডেভেলপার সেট করে।

উদাহরণ:

```js
let x = null;
console.log(x);
// Output: null
```

### 2. What's the use of the `map()` function in JS? How is it different from `forEach()`?

map() ব্যবহার করা হয় একটা array এর উপর অপারেশন চালিয়ে তাকে বদলায়ে নতুন একটা array বানানোর জন্য। তবে এখানে অপারেশন চালিয়ে বদলানো হয় কপি array-কে। আসল array অস্পৃষ্ট থাকে।

উদাহরণ:

```js
const nums = [2, 3, 4];
const squareNums = nums.map((num) => num ** num);
console.log(nums); // Output: [2, 3, 4]
console.log(squareNums); // Output: [4, 9, 16]
```

forEach() শুধু আসল array এর উপর লুপ করে, কোনো নতুন এরে বানায়ে দেয় না।

### 3. What's the difference between `==` and `===`?

== শুধু ভ্যালুকে তুলনা করে। বা এটাও বলা যায় যে টাইপ কনভার্সন করে তুলনা করে। এইটার তুলনা weak, ইন্ডাস্ট্রিতে এইটা ব্যবহার না করাই ভালো।

উদাহরণ:

```js
console.log(106 == "106"); // Output: true
```

=== ভ্যালু এবং টাইপ দুটাই তুলনা করে। এইটার তুলনা strict, ইন্ডাস্ট্রিতে এইটাই সবচেয়ে বেশি ব্যবহার হয়।

উদাহরণ:

```js
console.log(106 === "106"); // Output: false
```

### 4. What's the significance of `async/await` in fetching API data?

async/await ব্যবহার করা হয় asynchronous কোডকে synchronous স্টাইলে লেখার জন্য। এতে কোড বেশি সুপাঠ্য হয়, নেস্টেড .then() এড়ানো যায়, এরর হ্যান্ডলিং try/catch দিয়ে সহজ হয়।

async/await ছাড়া:

```js
function fetchUsers() {
	fetch("https://jsonplaceholder.typicode.com/users")
		.then((res) => res.json())
		.then((data) => console.log(data));
}
```

async/await সহ:

```js
async function fetchUsers() {
	const res = await fetch("https://jsonplaceholder.typicode.com/users");
	const data = await res.json();
	console.log(data);
}
```

### 5. Explain the concept of Scope in JS (Global, Function, Block).

সহজ সরল সিম্পল ভাবে বললে, scope মানে বুঝায় ভ্যারিয়েবলকে কোথায় এক্সেস করা যাবে।

**গ্লোবাল স্কোপ:**

গ্লোবাল ভ্যারিয়েবল ফাইলের সব জায়গায় এক্সেস করা যায়। যেমন:

```js
let name = "PH";
function greet() {
	console.log("Assalamu Alaikum,", name); // ✔️ "Assalamu Alaikum, PH"
}
```

**ফাংশন স্কোপ:**

ফাংশনের মধ্যে ডিক্লেয়ার করা ভ্যারিয়েবল শুধু ওই ফাংশনেই এক্সেস করা যায়। যেমন:

```js
function declareNum() {
	let x = 106;
}
console.log(x); // ✖️ Error
```

**ব্লক স্কোপ:**

একটা ব্লকে ({} এর মধ্যে) ডিক্লেয়ার করা ভ্যারিয়েবল শুধু ওই ব্লকেই এক্সেস করা যায়। let এবং const এই স্কোপ অনুসরণ করে। যেমন:

```js
if (true) {
	let isDev = true;
}
console.log(isDev); // ✖️ Error
```
