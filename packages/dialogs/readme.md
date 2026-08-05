# Dialogs

Used to make code-based dialogs easy.

| Component | Purpose |
|----|----|
| **useDialog.js** | Composable Wrapper around <a href="https://sweetalert2.github.io/" target="_blank">sweetalert2</a> |
| **useToasts.js** | Composable Wrapper around <a href="https://apvarun.github.io/toastify-js/" target="_blank">toastify-js</a> |
| **Modal** | Universal Modal component |




## Dialogs

Dialogs are easily created when the useDialog composable is imported:
  
```js
import { useDialog } from '@dlm/dialogs';
const dialog = useDialog();

dialog.message({ title: "Title text", text: "Body text" });
```

There are three methods, each one takes a configuration object.

| Method | Purpose |
|----|----|
| dialog.message() | Displays a message with a confirm/dismiss button |
| dialog.confirm() | Displays a message with a confirmation and a cancel button. Returns a result with "isConfirmed" |
| dialog.prompt() | Displays a message with an input, a confirmation and a cancel button. Returns a result with "isConfirmed" and the value of the input. |



## Toasts

Toasts are easily created when the useToasts composable is imported:
  
```js
import { useToasts } from '@dlm/dialogs';
const toasts = useToasts();

toasts.success("You did it! Great Job!");
```

There are three methods, each one takes a string message.

| Method | Purpose |
|----|----|
| toasts.success('message') | Displays a 'success' message, which fades away a moment later |
| toasts.info('message') | Displays a 'info' message, which fades away a moment later |
| toasts.warning('message') | Displays a 'warning' message, which fades away a moment later |
| toasts.error('message') | Displays a 'error' message, which fades away a moment later |

