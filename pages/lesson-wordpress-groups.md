# Drumeo JSON API Documentation — LessonWordpressGroups

# LessonGroupJsonController

in members-area.php (dir: laravel/app/routes/)

```php
Route::get(
    '/members-area/json/lesson-group/{name}',
    [
        'as' => 'members-area.json.lesson-group.request',
        'uses' => 'MembersArea\LessonGroupJsonController@request'
    ]
);
```

There are two kinds of params to specify for this:

1. when you're setting the URL in the HTML
2. when you calling the route with AJAX from JS

## 1. Params for setting the URL in the HTML

"name" param is specified when url is specified in HTML as such:

```html
<input id="lesson-group-ajax-info" type="hidden"
   data-ajax-url="{{ URL::route('members-area.json.lesson-group.request', ['courses']) }}"
>
```

"courses" Will be passed to `LessonGroupFactory`'s `create` method.

Thus, the name specified must match the constants available in 

```php
const LESSON_TYPE_LIBRARY = 'library';
const LESSON_TYPE_SONGS = 'songs';
const LESSON_TYPE_COURSES = 'courses';
const LESSON_TYPE_PLAY_ALONGS = 'play-alongs';
const LESSON_TYPE_STUDENT_FOCUS = 'student-focus';
```

## 2. Params for calling the route with AJAX from JS

Pass params by URL:(all are optional*): skip, row\**, numberToLoad

\* If 'skip' or 'row' params are passed, they must **both** be passed.

\** must be in `$difficulties` static array of the entity class for the Wordpress Group you're using. See example on page ["Binding hardcoded values to an originating point"](guidelines/binding-hardcoded-values-to-an-originating-point.md). 