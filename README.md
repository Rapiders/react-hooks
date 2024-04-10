# React Hooks

It is a package that collects hooks that are often used for quick development.

# Usage

```
npm install @d0422/react-hooks
```

### useInput

simple hook to change input components(uncontroll component) to controll component

```tsx
    const {value, onChange, reset}=useInput('');
    ...
    return
    <div>
        <input value={value} onChange={onChange}/>
        <button onClick={reset}>RESET</button>
    </div>
```

## Animation

The animation of this package is based on ClassName by default.

So first, Declare css classNames that show animations

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fadeOut {
  animation-name: fadeOut;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}
.fadeIn {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}
```

### useAnimation

useAnimation manages AnimationClassName.

`triggerUnmountAnimation` : trigger unmount animation.

`handleUnmountAnimationend` : manage className automatically. You have to register this funciton to animation HTMLElement.

`unmountCallback` : this callback is called when animationEnded.

### useFocusAnimation

useFocusAnimation activates the animation when the corresponding HTMLElement enters the screen.
You have to register ref to animation HTMLElement.
