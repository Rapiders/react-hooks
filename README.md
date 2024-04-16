# React Hooks

It is a package that collects hooks that are often used for quick development.

[Korean Docs](https://rapiders.github.io/react-hooks/)

**Warning**
Test code is not fully prepared yet. Please note.

# Usage

```
npm install @rapiders/react-hooks
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

you can set `startIndex` and `minMove`.

`minMove` : Minimum movement required for the index to shift.

### useDragCarouselIndex

This hook should be called within the carousel provider provided by the useDragIndexCarousel component.
carousel provider renders children elements. It already has the `display: flex` property included.

you can get current index in carousel children.

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
