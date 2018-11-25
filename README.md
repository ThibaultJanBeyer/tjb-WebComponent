# tjb-webcomponent

Dead Simple helper Class for creating HTMLElements (native WebComponents).

![gzip size](http://img.badgesize.io/https://tjb-webcomponents.github.io/tjb-webcomponent/tjb-wc.min.js?compression=gzip)

## Benefits

Take away amount of boilerplate to create:

- ShadowDom combining CSS & HTML nodes
- Add getters and setters to watched attributes:
  So for each attribute `myClass.foo = 'bar'` will work the same as `myClass.setAttribute('foo', 'bar')`

## Add to project

You might want to use a Polyfill for WebComponent:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-lite.js"></script>
```

### Include via HTML

Include it:

```html
<script
  src="https://tjb-webcomponents.github.io/tjb-webcomponent/tjb-wc.min.js"
  type="module"
></script>
```

### Include via JavaScript

```JavaScript
import WebComponent from 'https://tjb-webcomponents.github.io/tjb-webcomponent/tjb-wc.min.js'
```

### Include via NPM

Console:

```bash
npm i -S tjb-webcomponent
```

Then in your code:

```JavaScript
import WebComponent from 'tjb-webcomponent'
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

  // CSS
  ////////////////////////////////////////////////////////////

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

  // Markup
  ////////////////////////////////////////////////////////////

  HTML() {
    return html`
      <div class="orange">I’m an orange text</div>
    `;
  }

  // Attribute Handling
  ////////////////////////////////////////////////////////////

  static get observedAttributes() {
    return ['color']
  }

  handleColorChange(newValue, oldValue) {
    this.domNode.className = newValue;
  }

  // Logic
  ////////////////////////////////////////////////////////////

  connectedCallback() {
    super.connectedCallback();
    // do your own stuff
  }
}

// Useful methods:
this.reRender()  // Redraw/Replace the whole component (only if it is connected)

customElements.define("my-class", MyClass);
```

Now you can use it just as any other Web Component:

```html
<my-class></my-class>
```

You would be able to change the color for instance like so:

```JavaScript
const node = document.querySelector('my-class'); // get the node if you don’t already have it
node.color = 'blue'; // will call handleColorChange and add the class 'blue'
// this is equivalent to node.setAttribute('color', 'blue')
// or also <my-class color="blue"></my-class>
```

# Enjoy

[![Typewriter Gif](https://tjb-webcomponents.github.io/tjb-webcomponent/typewriter.gif)](http://thibaultjanbeyer.com/)
