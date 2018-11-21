# tjb-webcomponent

Dead Simple helper Class for creating HTMLElements (native WebComponents)

![gzip size](http://img.badgesize.io/https://thibaultjanbeyer.github.io/tjb-WebComponent/tjb-wc.min.js?compression=gzip)

## Benefits

Take away amount of boilerplate to create:

- ShadowDom combining CSS & HTML nodes
- Add getters and setters to watched attributes

## Add to project

### Include via HTML

```html
<script
  src="https://thibaultjanbeyer.github.io/tjb-WebComponent/tjb-wc.min.js"
  type="module"
></script>
```

### Include via JavaScript

```JavaScript
import WebComponent from 'https://thibaultjanbeyer.github.io/tjb-WebComponent/tjb-wc.min.js'
```

### Include via NPM

Console:

```bash
npm i -S tjb-WebComponent
```

Then in your code:

```JavaScript
import WebComponent from 'tjb-WebComponent'
```

## Useage

When defining your WebComponent, instead of extending `HTMLElement` just extend `WebComponent` like so:

```JavaScript
class MyClass extends WebComponent {
  // do something here
}
```

That’s it. You’re ready to use the WebComponent helper like so:

- With any html template tool

```JavaScript
class MyClass extends WebComponent {

  CSS() {
    return html`
      <style>
        .orange {
          color: orange;
        }

        .blue {
          color: blue;
        }
      </style>
    `;
  }

  HTML() {
    return html`
      <div class="orange">I’m an orange text</div>
    `;
  }

  static get observedAttributes() {
    return ['color']
  }

  handleColorChange(newValue, oldValue) {
    this.domNode.classList.add(newValue);
  }
}

customElements.define("colored-text", MyClass);
```

Now you can use it just as any other WebComponent:

@TODO: complete readme
