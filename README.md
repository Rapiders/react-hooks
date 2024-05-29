# React Hooks

It is a package that collects hooks that are often used for quick development.

[Korean Docs](https://rapiders.github.io/react-hooks/)
[Contribution](https://github.com/Rapiders/react-hooks/tree/main/.github/CONTRIBUTING.md)

# Usage

```
npm install @rapiders/react-hooks
```

## Hooks

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

### useRadio

A hook to use the uncontrolled Radio component as a controlled component.

#### Generic

By using generics, you can configure the Radio component in a type-safe manner when using the hook.

```typescript
type RadioType = '🍕' | '🍔' | '🍟' | '🌭';
const { value, Radio, RadioGroup } = useRadio<RadioType>('🍕');
```

#### Function Arguments

You can set a `defaultValue`.

#### Return Values

`value`: The currently selected value among the Radios.

`Radio`: The Radio component. You can set the value in a type-safe manner through the hook. You can change the displayed value using children.

`RadioGroup`: A group that wraps multiple Radios.

### useInterval

simple hook to setInterval with React Component

```tsx
...
const callback = () => {};
const { continueTimer, stop, intervalRunning } = useInterval(callback, 1000); //1000ms
```

### useAfterMountEffect

It can be used the same as `useEffect`, but unlike useEffect, callback does not run on the first mount.

```tsx
export default Component() {
  useAfterMountEffect(() => {
    // callback
  }, [deps])
}
```

### useDebounce

A hook that makes debounce easy to use.
No matter how many times a returned function is called, it is performed only once after a specified time after the function stops being called.

```ts
const callback = () => {};
const debounce = useDebounce(() => callback, 1000); // 1000ms
```

#### Function Arguments

`callback`: The function to be executed at the end via debounce.

`time` : The delay time to perform a callback after a function call has stopped, in ms.

#### Return value

`debounceFunction` : Returns callback with debounce.

### useThrottle

A hook that makes it easy to use the trottle.
No matter how many times the returned function is called, it is performed once per specified time.

```ts
    ...
    const callback=() => {};
    const throttle=useThrottle(callback, 1000); // 1000ms
    return <button onClick={throttle}>Click me!</button>
```

#### Function Arguments

`callback` : The callback function to be performed by applying a triple.

`time` : Specifies how often to perform the throttle (in ms)

#### Return value

`throttleFunction` : Returns the callback with the throttle applied.

### useLocalStorage

`useLocalStorage` is a custom hook that makes it easy for React applications to use local storage, which allows you to implement the ability to store, update, and remove data on local storage, and optionally set the expiration time for data.

```tsx
function App() {
  const [name, setName, removeName] = useLocalStorage<string>('name', 'old name', {
    serializer: (value: string) => value,
    deserializer: (storedValue: string) => storedValue,
  }); // 24h

  return (
    <div>
      <p>{`Name: ${name}`}</p>
      <button onClick={() => setName('new name')}>change name</button>
      <button onClick={removeName}>remove name</button>
    </div>
  );
}
```

#### Generic

`<T>`: Type of data stored on local storage.

#### Function Arguments

`key (string)`: Key to local storage

`initialValue (T | null)`: Initial value of local storage

`options (UseLocalStorageOptions | undefined)`: You can specify serializer and deserializer, which are executed when values are stored in and imported from local storage, respectively.

#### Return Values

`value (T | null)`: The value currently stored on local storage.

`saveValue (function)`: A function that stores a new value on local storage.

`removeValue (function)`: A function that removes values related to the current key from the local storage.

## Animation

The animation of this package is based on ClassName by default.

First, declare css classNames that show animations

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

You can then use class names as parameters for the animation hooks.

### useAnimation

useAnimation manages mount/unmountAnimation.

`AnimationWrapper`: Apply mount/unmountAnimation to the children prop provided in the AnimationWrapper. you can provide style prop to apply style to Wrapper

`show` : triggers the mount animation.

`hide` : trigger unmountAnimation and unmount children prop

`isShow` : indicates the status for child props.

### useFocusAnimation

useFocusAnimation activates the animation when the corresponding HTMLElement enters the screen.
You have to register ref to animation HTMLElement.

### useDragIndexCarousel

With "useDragIndexCarousel," you can easily implement a dragable Index Carousel.

#### parameters

`dataLength`, `options`

`options`: let you adjust the option of the carousel.

`startIndex` : specifies the start index.

`infinity` : Specifies whether to loop back to the beginning when the carousel reaches the end.

`minMove`: determines how many slides you have to slide over.

#### return values

useDragCarousel returns `isDragging`, `CarouselWrapper`, `next`, `prev`, `index`, `ref`, `isEnd`, `isStart`

`isDragging`: Indicates whether the element is being dragged or not.

`CarouselWrapper`: renders children elements. It already contains `display:flex` property.

`ref`: you need to assign a ref to the Carousel Wrapper.

`next`: increase index.

`prev`: decrease index

### useCarousel

#### parameters

`dataLength`, `options`

`options`: let you adjust the option of the carousel.

`startIndex` : specifies the start index.

`infinity` : Specifies whether to loop back to the beginning when the carousel reaches the end.

#### return values

useCarousel returns `CarouselWrapper`, `next`, `prev`, `index`, `ref`, `isEnd`, `isStart`

`CarouselWrapper`: renders children elements. It already contains `display:flex` property.

`ref`: you need to assign a ref to the Carousel Wrapper.

`next`: increase index

`prev`: decrease index

```tsx
const SomeComponent = () => {
  const { CarouselWrapper, ref } = useCarousel();
  return (
    <CarouselWrapper ref={ref}>
      {data.map((eachData) => (
        <div>
          <img src={eachData.img} />
        </div>
      ))}
    </CarouselWrapper>
  );
};
```
