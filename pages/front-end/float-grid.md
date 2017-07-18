<script type="text/javascript">
    function resizeIframe(iframe) {
        iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
      }
      
      iframeContainer = document.getElementsByTagName('iframe');
      
      console.log(iframeContainer);
      window.onresize = function(){
        for(i = 0; i < iframeContainer.length; i++){
          resizeIframe(iframeContainer[i]);
        }
      }
</script>

# Rows

The grid uses a row container to house the main contents of a page. There are two containers to choose from.

The default row container is a responsive fixed width container. Capping at ~1000px on desktop widths.
```html
    <div class="row">
    ...
    </div>
```

The fluid row container expands itself to cover the full viewport, regardless of breakpoint
```html
    <div class="row fluid">
    ...
    </div>
```
# Columns

The grid uses a 12 column float layout. (Meaning each column floats to the left and wraps back to the left upon overflowing.)
* It is recommended that columns are a direct child of rows
* Columns can be nested indefinitely, rows cannot
* Grid classes apply to devices with screen widths greater than or equal to the breakpoint sizes, and override grid classes targeted at smaller devices. Therefore, e.g. applying any .md-* class to an element will not only affect its styling on medium devices but also on large devices if a .lg-* class is not present.

Here we have a column that is 2 columns wide on large devices, 4 columns wide on medium devices, and 6 columns wide on small devices
```html
    <div class="col lg-2 md-4 sm-6">
    ...
    </div>
```

Here is a table showing how certain aspects of the grid behave on certain breakpoints

|                 | Small Devices ( ≤ 640px)  | Medium Devices ( ≤ 1024px)   | Large Devices ( > 1024px) |
|-----------------|---------------------------|------------------------------|---------------------------|
| Row Width       | Fluid (100%)              | Fluid (100%)                 | Fixed (1000px)            |
| Class Prefix    | .sm-*                     | .md-*                        | .lg-*                     |
| Gutter Width    | 30px / 3                  | 30px / 2                     | 30px / 2                  |

# Gutters

* Columns and rows both have a gutter size of 1.875rem (30px) half of the gutter width is added to each side of the container on desktop and tablets, while one third of the gutter width is added to each side on mobile.
* Gutters can be removed from rows and columns by adding the collapsed class to the container

```html
    <div class="row collapsed">
    ...
    </div>
    <div class="col lg-2 md-4 sm-6 collapsed">
    ...
    </div>
```

# Examples

Here's an example of a grid using classes for all breakpoints. .sm-6 means on smaller devices the columns will be 12/6 or 2 wide. md-4 means on medium devices the columns will be 12/4 or 3 wide. .lg-2 means the columns will be 12/2 or 6 wide.

<iframe onload="resizeIframe(this)" onresize="resizeIframe(this)" src="html-samples/grid.html"></iframe>

# Visibility Classes

# Sass Variables