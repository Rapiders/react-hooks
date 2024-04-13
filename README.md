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

So first, declare css classNames that show animations

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

then, you can use className as parameters of animation hooks

### useAnimation

useAnimation manages mount/unmountAnimation.

`AnimationWrapper`: Apply mount/unmountAnimation to the children prop provided in the AnimationWrapper. you can provide style prop to apply style to Wrapper

`show` : trigger mountAnimation

`hide` : trigger unmountAnimation and unmount children prop

`isShow` : indicates the status for child props.

### useFocusAnimation

useFocusAnimation activates the animation when the corresponding HTMLElement enters the screen.
You have to register ref to animation HTMLElement.

### useDragIndexCarousel

With "useDragIndexCarousel," you can easily implement a dragable Index Carousel.

you can set `startIndex` and `minMove`.

`minMove` : minimum movement that the index goes over.

### useDragCarouselIndex

this hook must be called in carousel provider which is provided by useDragIndexCarousel Component.
carousel provider renders children elements. It already contains `display:flex` property.

you can get current index in carousel children.

### useCarousel

useCarousel returns `CarouselWrapper`, `next`, `prev`, `index`, `style`, `ref`

`CarouselWrapper`: renders children elements. It already contains `display:flex` property.

`next`: increase index

`prev`: decrease index

`ref`: you have to assign ref to Carousel Wrapper

`style`: you have to assign style to Carousel Wrapper

```tsx
const SomeComponent = () => {
  const { CarouselWrapper, ref, style } = useCarousel();
  return (
    <CarouselWrapper ref={ref} style={style}>
      {data.map((eachData) => (
        <div>
          <img src={eachData.img} />
        </div>
      ))}
    </CarouselWrapper>
  );
};
```
