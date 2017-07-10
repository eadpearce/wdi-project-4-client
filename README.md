# WDI Project 4: ColLAB 

![collab_logo](https://user-images.githubusercontent.com/25905279/27910662-1531faca-624e-11e7-9e4a-7f4fd0f0a5be.png)

## Intro 

### What is ColLAB? 

ColLAB is a site for writing and requesting fanfiction based on something in fandom called an 'anon meme'. Anon memes tended to start as a journal post on blogging sites such as Livejournal or Dreamwidth and the requests (prompts) and fanfiction (fills) were made anonymously in the comments. This way everything is made in the comments section - there is no set way to differentiate between prompts, fills and regular comments, which gets confusing and hard to moderate very quickly. I wanted to create a site that allowed users to do this kind of collaboration easily in a purpose-built site. All posts can be searched by tags, author, content rating, date posted, and whether a writing prompt has been filled or not. The live site can be found [here](https://nameless-lowlands-14883.herokuapp.com/).

### Project Brief 

Build a site using Ruby on Rails and AngularJS with two or more data models with complex relationships. 

## Data Relationships 

![data relation diagram](https://user-images.githubusercontent.com/25905279/28012845-069641a6-655f-11e7-9c41-85629ce5b9e4.png)

A user can author many prompts, fills, and comments, and these posts will belong to them. Comments and fills cannot exist without a parent post. A fill must be in response to a prompt and when it is created it inherits tags from the parent prompt. A comment must be in response to a fill or a prompt. Unlike with [XIVB](https://github.com/eadpearce/wdi-project-2) comments are not threaded. 

I wanted a way to search fills and prompts by tags so I made tags into a separate models. This means I could have a page like this where the font size of the tags increases depending on how many fills or prompts exist with that tag. 

![tags page](https://user-images.githubusercontent.com/25905279/28013131-ea4065c6-655f-11e7-8f44-3a4ad8bed560.png)

```
<div ng-if="tags.prompt">
  <span ng-repeat="tag in tags.all" ng-if="tag.prompts.length > 0">
    <a class="link hover-green dark-green underline" href=""
      ng-class="{
      'f4': tag.prompts.length < 5,
      'f3': tag.prompts.length >= 5,
      'f2': tag.prompts.length >= 20,
      'f1': tag.prompts.length >= 50
      }"
      ui-sref="promptsIndexTag({ tag: tag.id })">{{tag.name}}</a>
      <span ng-if="!$last">, </span></span>
</div>
```
This bit of code adds different Tachyons classes that change the font size depending on the number of prompts with that tag. 

## Search 

Prompt and fill search uses Angular filters to sort through results. 

![](https://user-images.githubusercontent.com/25905279/28015277-19a11b92-6567-11e7-83bb-b69551f3a473.png)

```
<div class="pa2"
  ng-repeat="item in
    (filteredItems = (content |
    filter: search |
    filter: { filled: filled } |
    filter: { rating: rating } |
    filter: { unfilled: unfilled } |
    orderBy: 'created_at': true |
    limitTo: limit : pagination )) track by $index">
```

Since the grid displaying prompts and fills is a directive all the search options and the content being filtered need to be passed to it when it is called on the page. Using type, page, and width this directive can be reused to display prompts and fills and its layout altered depending on which page it is being displayed on - one kind of grid layout for user profiles and another for the prompts/fills index pages. 

```
angular
  .module('collabApp')
  .directive('grid', grid);

grid.$inject = [];
function grid() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true; 
  directive.templateUrl ='/js/views/templates/grid.html';
  directive.scope = {
    type: '@',
    page: '@',
    width: '@',
    content: '=',
    search: '=',
    filled: '=',
    unfilled: '=',
    rating: '=',
    limit: '=',
    user: '=',
    pagination: '='
  };
  return directive;
}
```

Search options are then passed to the directive from the prompts index controller: 

```
<grid 
  type="prompt" 
  rating="prompts.rating" 
  content="prompts.all" 
  width="grid" 
  search="prompts.q" 
  filled="prompts.isFilterByFilled" 
  unfilled="prompts.isFilterByUnfilled" 
  limit="prompts.limit" 
  pagination="prompts.pagination">
</grid>
```

The pagination (displaying 1 to X of Y) is worked out in the controller using this bit of code: 

```
vm.limit = 10; // sets the max number of posts per page
  vm.pagination = 0; // sets the current page to 0 on page load 
  if (vm.pagination + vm.limit === vm.limit) vm.max = vm.limit;
  // max is the number of the last post on the current page 
  else vm.max = vm.all.length;
  // if on the last page and there are fewer posts than the limit
  // max will be the number of the last post = all.length
  vm.next = function() {
    vm.pagination = vm.pagination + vm.limit;
  };
  // advance the shown posts by the limit 
  vm.back = function() {
    if (vm.pagination !== 0) vm.pagination = vm.pagination - vm.limit;
  };
  // go back by limit number of posts unless we are already on the first page 
```

Used on the page: 

```
Displaying {{prompts.pagination+1}} to
  <span ng-if="prompts.pagination+prompts.limit < prompts.all.length">
    {{prompts.pagination+prompts.limit}}
  </span>
  <span ng-if="prompts.pagination+prompts.limit >= prompts.all.length">
    {{prompts.all.length}}
  </span>
  of {{prompts.all.length}}
```

## Responsive Design 

[Tachyons](http://tachyons.io/) was used to style the site because of its easy to understand responsive classes and ease of use since I've had a lot of time to practise with it on homeworks and other projects. 

![Different device layouts](https://user-images.githubusercontent.com/25905279/28016195-431e3c94-656b-11e7-93c2-6120d3eb5fb9.jpg)

```
<div class="pa2"
  ng-class="{
    'h5 db fl w-third-l w-50-m w-100': width === 'grid',
    'h5 db fl w-100': width === 'full',
    'db fl w-100': page === 'user',
    'h5 w-100': width === 'half',
    'mb5': type !== 'user' && $last,
    'mb5': page === 'user' && type === 'fill' && $last,
    'mb5 mb0-ns': width === 'grid' && $last
  }">
```

When the width for the directive is set to 'grid' the classes added are `h5 db fl w-third-l w-50-m w-100`. This means: 

* `h5` gives each element a fixed height
* `db` adds the style 'display: block'
* `fl` floats elements left
* `w-third-l` makes the width of the elements one third of the parent element on large screens
* `w-50-m` makes the elements 50% width on medium screens
* `w-100` makes elements 100% width on smallest screens

