# create-new-pages-categories

## Create a new page

In `/pages/` create a file ending in `.md`.

## Add page to nav

### Top-level

In /index.html, in the ".sidebar-container > ul" element, create a new list item with the class of "nav-item".

In that `li` element, create a span with `md-link nav-link` classes. Create a data attribute called `data-file` to specify the file that the link will load. Put your file name — relative to /pages/`.

ex:

``` html
<span class="md-link nav-link" data-file="syntax.md">
    Syntax
</span>
```


### Nested

Exact same thing, but do it in the `ul` in the top-level nav (`li`) element.

To create this, make a `ul` with the classes `nav nav-pills nav-stacked`. It should be directly decendant to the parent `li`, and thus a sibling to the `span`.

ex:

```html
<div class="sidebar-container">
    
    <ul class="nav nav-pills nav-stacked">
        
        <li class="nav-item">
    
            <span class="md-link nav-link" data-file="guidelines.md">
                Home / Guidelines
            </span>

            <ul class="nav nav-pills nav-stacked">
                <li class="nav-item">
                    <span class="md-link nav-link" data-file="syntax.md">
                        Syntax
                    </span>
                        </li>
                        <li class="nav-item">
                    <span class="md-link nav-link" data-file="create-new-pages-categories.md">
                        Create New Pages/Categories
                    </span>
                        </li>
                        <li class="nav-item">
                    <span class="md-link nav-link" data-file="test2.md">
                        Pushing Changes
                    </span>
                </li>
            </ul>

        </li>

        <li class="nav-item">
            <span class="md-link nav-link" data-file="aws-ebs-cron-jobs.md">
                aws-ebs-cron-jobs
            </span>
        </li>

    </ul>
</div>
```

-----
fin