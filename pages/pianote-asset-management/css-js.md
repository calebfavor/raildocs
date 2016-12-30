# Managing SASS/CSS and JS

## SASS/CSS

### How It Works

All .scss files inside the resources/assets/sass/ are combined and compiled down to css files which get places inside public/assets/css/.

### Creating New SASS/CSS Files

Files inside a sub folder are compiled down in to a file using that folders name. For example:

```
resources/assets/sass/all/file1.scss
resources/assets/sass/all/file2.scss
resources/assets/sass/all/file3.scss
```

Will be compiled in to:

```
public/assets/css/all.css
```

***

If you want to use generate single one off css files use, the special singles folder. For example:

```
resources/assets/sass/singles/my-single-styles-1.scss
resources/assets/sass/singles/my-single-styles-2.scss
resources/assets/sass/singles/my-single-styles-3.scss
```

Will be compiled in to:

```
public/assets/css/my-single-styles-1.css
public/assets/css/my-single-styles-2.css
public/assets/css/my-single-styles-3.css
```

**NOTE: You can put pure/raw css inside scss files. Please do not create raw css files manually inside the public folder**

### Creating New Folders/Compiled Files

- Create a new folder inside resources/assets/sass/ . Example:
```
resources/assets/sass/my-fun-css
```

- Put your new scss files that you want compiled into that folder. Example:
```
resources/assets/sass/my-fun-css/some-file-1.scss
resources/assets/sass/my-fun-css/some-file-2.scss
```

- Open gulpfile.js in the project root.
- Copy this gulp compile function template and past it inside the scss gulp job function under the existing ones.
```js
gulp.src('resources/assets/sass/REPLACE-ME/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('REPLACE-ME.css'))
    .pipe(sourcemaps.write('./maps/REPLACE-ME'))
    .pipe(gulp.dest('public/assets/css'));
```

- Replace REPLACE-ME instances with your final css folder name/filename.

**Final example result:**

```js
gulp.task('sass', function () {
    // some existing compile functions here
    // some existing compile functions here
    // some existing compile functions here
    
    // my-fun-css.css
    gulp.src('resources/assets/sass/my-fun-css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('my-fun-css.css'))
        .pipe(sourcemaps.write('./my-fun-css/all'))
        .pipe(gulp.dest('public/assets/css'));
});
```

- Run gulp and done!

## JS

Coming soon... Its basically the same as the js.