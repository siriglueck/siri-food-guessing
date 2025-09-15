# Note to self

## 1. Multiple listeners can be attached to one element. While, onclick is a single function to run when the element is clicked

```
element.addEventListener("click", () => {
console.log("Clicked!");
});'
```

```
element.onclick = () = > {
console.log("Clicked!");
};
```

for example

```
<button id="btn">Click me</button>

<script>
  const btn = document.getElementById("btn");

  // Using onclick
  btn.onclick = () => console.log("First handler");
  btn.onclick = () => console.log("Second handler"); // Overwrites the first

  // Using addEventListener
  btn.addEventListener("click", () => console.log("Handler A"));
  btn.addEventListener("click", () => console.log("Handler B")); // Both run
</script>
```

## 2. Differences between calling a function within a listener

with reset(), this means it is called at the moment it is run and attached return value to this element

```
restartButton.addEventListener("click", reset());
```

While, reset(), this means attaching the function to this element

```
restartButton.addEventListener("click", reset);
```
