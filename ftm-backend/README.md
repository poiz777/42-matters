# 42 MATTERS TEST: BACKEND SOLUTION.
This is Poiz's Solution to the Backend layer of the «42 Matters» FullStack Developer Assignment using 
PHP 7 as the preferred Backend-Language. No RDBMS is used in this Project - not even the lightweight, 
portable `SQL-Lite`. The Data-Source used in this Project is the regular, `Plain, Old PHP's` (POP) 
`Multi-Dimensional Array` that was supplied with the Assignment: `sdks.php`.

## Installation
  This Solution uses `composer` for 2 reasons: 
  1. Managing a few Dependencies 
  2. Auto-loading relevant Classes. 

The only productive Dependency of this Project is a super-simple Rest-Server written by 
Jack Wright: `jacwright/restserver`. The other dependency is merely for debugging purposes.  
  
Like the Frontend tier of this Project, the Installation process here is equally quite simple
and also pretty much straight-forward. On the terminal, just run: 
```sh
  composer install
```
This Command should be executed at the very top-level of the `backend` Directory resulting from 
the unzipped package. Executing this Command will pull-in the required dependencies. 
Once «Composer» is done resolving the dependencies, you can just fire-up the `built-in PHP-Server` 
with the following Command:
```sh
 php -S localhost:8000
```
Notice the `:8000` there? That is specifying the Port. By default, i chose `8000` because 
both Ports `8000` and `8080` are currently free on my machine at the time of coding this project.
However, feel free to change this to any other Port Number of your choosing.

**WARNING:**
*The Frontend sends Request to this Port:* `8000`. *Therefore, if you change this Port, you must as well* 
*change the corresponding Port at the Frontend Layer. You can change it there within the Class-File:*
`$root/src/services/EndPointsProvider.js`

## API Usage & Endpoints
Once the built-in PHP Server is running, you may as well just open your preferred REST-Client Application.
I personally use `Postman`. The Browser is totally fine - so long as you can see the `json-formatted` Output.
On my Machine, i have a `Chrome Plugin` called `JSON Formatter` which automatically does the formatting for me. 
Anyways, You can test out the following Endpoints using whichever `REST-Client App` available.

1. http://localhost:8000/api/v1/fetch-all
   ( Fetches all Data - automatically sorted by `title` in Ascending order. )
2. http://localhost:8000/api/v1/fetch-tags
      ( Fetches all Tags as a Flat Array-List: Automatically sorts them alphabetically in Ascending order plus
      strips off all empty, and/or Duplicate Tags and returns a numerically indexed Array-List of Unique Tags. )

###### Important Side Note:
This App performs only `READ` Operation and thus uses only the `GET` Method. In other word: **All Requests are `GET` Requests!**  *By the way, i added a few  arbitrary tags just to test the case where we have more
than 2 tags...*


Well, the API also allows you to further fine-tune, paginate, sort or rather manipulate the returned Dataset 
by supplying query-strings as part of the Endpoint for example: `http://localhost:8000/api/v1/fetch-all?filter=ad-network`

The following is a list of `allowed query-parameters`:
* `filter`: ([`string`]) *Filters the Result by «Tag» given by the `filter` Parameter, Filtering applies only to Tags. 
Multiple filter-values can be separated by commas as in `marketing-automation,ad-network`:  `Default = NULL`*
* `limit`: ([`int`]) *Determines / Limits the number of Result per Request / Page: `Default = 1000`*  
* `page`: ([`int`]) *Sets which page from which the next Data-Slice would be taken (usable with `limit` and great for Pagination):  `Default = 1`*  
* `sort`: ([`string`]) *Possible values for this option are: `title`, `id` & `tags`. 
Records are sorted based on the value of this option:  `Default = title`*  
* `direction`: ([`int`]) *Determines the Sort-Order - ie: «Ascending» or «Descending». `ASCENDING = 1`, `DESCENDING = 2`.  `Default = 1`*  

Here are a few examples of using a one, more or a combination of the the above query parameters:
1. http://localhost:8000/api/v1/fetch-all?page=2&limit=10&sort=title
      ( Fetches a Max. of 10 Records per Page [`limit=10`], starting from the `11th Item` within the sorted list,
      [`page=2`]. The Result-Set should be sorted by the `title`-Field [`sort=title`]. )
2. http://localhost:8000/api/v1/fetch-all?page=2&limit=3&sort=title&direction=2&filter=ad-network
      ( Fetches a Max. of 3 Records per Page [`limit=3`], starting from the `4th Record` within the sorted list, 
      [`page=2`]. The Result-Set is, anyways, sorted by the Field: `title` [`sort=title`] - 
      except this time, in opposite Direction - ie: DESCENDING Order. Since we have `filter=ad-network`,
      the returned Result-Set will only contain Records that have `ad-network` within their `tags Data-Set`. )

Fell free to mix and match these `Tweakers` to get even more variegated results.

## Authentication + Authorization
  This Application did not implement any Authentication or Authorization Layer - especially not with the allotted Time-frame.
  However, had i implemented Authentication and/or Authorization; the following steps would prove quite valuable for the entire 
  Process:
  1. The Simple stuffs first: To discourage `Spiders` or `Bots` from accessing our Application, a simple `Turing-Test`
  would suffice - Something like `Google CAPTCHA` or even light-weight equivalents would work just fine.
  2. Since only Registered Users are allowed (Authorized) to use our App, it would be great to use something like
  `JWT` (`JSON Web Tokens`) for such purposes - especially in a Scenario where there are different Levels of registered
  Users like `VIP Users`, `Platinum Users`, `Gold Users`, `Regular Users`, etc. In such a Scenario, it is obvious that
  the VIP User may be allowed access to certain vital parts of the App whereas the Regular User should never be granted
  access to those areas. It all boils down to the Complexity of the Application and the Use case anyways. 
  3. Again, depending on the complexity of the Application and the degree of Security required by the Application, 
  Authentication could be any one of: `Single Factor`, `2nd-Factor` or even `Multi-Factor`.
  Let's go the simple route - `Single Factor Authentication`, which is the most basic. This would require the usual 
  Login Form normally with `username + password` Fields. But, then their is also the risk of `SQL Injection` with these
  Forms. Strictly speaking, this may not be the case for our simple App which doesn't use any Database but we will 
  assume + pretend our `sdks Data` are coming from a Database. In this Case, the following measures would protect our 
  App from vulnerability to SQL-Injection Attacks.
    
  * Measures to Protect Login Forms against SQL Injection Attacks:
    * Never trust any User Input! Always sanitize them first! Using built-in PHP Functions
    like `htmlspecialcharacters()` to convert special characters to `HTML Entities` before
    sending them to the Database is one way of ensuring the Sanity of User-Data as well as 
    protect against such Attacks. Using `htmlspecialchars()` alongside `strip_tags()` may
    be useful in some cases.
    * Ensure that you receive (or at least cast the received Data to) the expected Data-Type.
    For example, if you expect an `int` Data-Type always be sure to cast the received data to 
    Integer with either `intval($input)` or `(int)$input` and so on...
    * Use Validation to ensure that only values conforming to certain Criteria are endorsed! 
    Although, technically, Validation may not strictly protect against such attacks, it sure
    forces the User to tailor his input according to the specifications thus boosting complexity
    by a notch.
    * Go even further by using `Prepared Statements` in your `SQL Queries`. Using `PDO` is much preferred.
    If you are using `ORM`  like `Doctrine`, then rest assured that `Prepared Statements` are already 
    automatically in use behind the scenes.
  
### Documentation
  What makes a good `API Documentation?` Well, a good API Documentation should, first, be
  terse but extremely clear and understandable. This means; one should be able to look at 
  an API Documentation and locate (without much fuss) the exact information he is looking for.
  I recently worked on a Project where i had to automatically generate API Documentation using `Swagger`.
  Below is a list of the steps i took to ensure that the Documentation was good and concise. 
  * Every Endpoint matters! This means, you should document every single endpoint - even trivial ones.
  Have you ever read an API Documentation and you go like: *«How the heck can i find information
  on how to update that resource?»* Well, that's because the Developer at the other end thought: 
  *«Heck! This is not so important... No one would really need this... why waste time documenting it?»* 
  Again, every Endpoint matters.
  * Be explicit about the `HTTP Methods` associated with a specific Operation/Endpoint. 
  By this, i meant the `HTTP Verbs` associated with the Operation like `GET`, `POST`, `PUT`, `DELETE`, `PATCH`... 
  It is never a good Idea to leave the Users of your API guessing these Methods - 
  even when you think  you have done a great job naming your Endpoints smartly in a self-descriptive manner.
  Always document this information. 
  * Name your endpoints smartly. The naming of your endpoints should reflect the Operation that would be 
   performed when a request is sent to that endpoint. Imagine this endpoint: 
   `/api/v1/users/fetch-all`. Without much thinking, it is clear that a request to this endpoint
   would fetch all users. This is self-descriptive, structured and even intuitive.
  * Structure and group related operations together in your API. You don't want unrelated 
   terms appearing in the name of a specific endpoint. For example, imagine this endpoint:
   `/api/v1/users/products`. This wouldn't make much sense because it seems unintuitive to associate
    users with Products. On the other hand, it is quite natural to associate a Store with Products as in:
    `/api/v1/store/products`. In the same way; it is much likely to associate users with Orders like: 
    `/api/v1/users/123456/orders`
  * Document both `required` and `optional` Parameters and give a couple of examples. Some endpoints may accept
  one or more parameters. In some cases, these parameters might be required and in others, optional. It is great
  to document this piece of information as well so the end developer using your API knows which parameters could be
  omitted and which he *must* supply.
  * Document `Data-Types` of each single Parameter. This is always helpful because
  one might get unexpected results when the wrong data type is used in a Request.
  * Document `return Data-Types` for each exposed Endpoint. This may sound trivial but it is crucial.
  Imagine a System that stores `user_id` as a `String`. Now, you want to consume the API exposed by this
  System and they didn't document the this information. Worse still, you are using a strongly-typed language
  like `Java` or `C-Sharp`. Now, You would expect that sending a request to this arbitrary Endpoint:
  `/api/v1/user/john/doe/get_id` would return an `Integer` but Heck, No!!! It simply returns a `Hex String`
  Identifier. By now, you can already visualize the impact of this in a Java or C-Sharp environment.
  Yes! Document `return types` even when `null` would be returned: it is worth the extra effort.
  * Finally, use Visuals to boost clarity & understanding for the consumers of your API. 
  It is really true that A Picture is worth a thousand Words. Does your Team / Company have the 
  Resources to fund a `Screen-Cast`? Then go for it and link it up in your Documentation afterwards. 
  Are you on Budget? No Problems, there is always the alternative to use good, old `Screenshots`. 
  Believe it or leave it, even professional Developers and Geeks would appreciate great Visuals that serve 
  as alternatives to reading through long, technically stuff to get at something really super-simple. 
  Visuals are good - use them whenever and wherever the opportunity presents itself - if you can.
    
   
-- Poiz Campbell


## Tips
* Did you know that you could further filter the return Dataset by using extra query-string
parameters? For example, you can `paginate`, `sort`, `filter` by `tags`, `id` or `title`
and even explicitly request a specific number of returned dataset per page. Below is a sample Endpoint
to get you started. Afterwards, you can modify + play around the query to suit whatever you want.

`http://localhost:8000/api/v1/fetch-all?limit=10&sort=title&page=1&filter=marketing-automation,ad-network&direction=1`

This will fetch only 10 Records (`limit=10`) that are sorted by the «title» Field (`sort=title`) and then 
further filtered by the Tags containing «marketing-automation» or «ad-network» (`filter=marketing-automation,ad-network`)
and finally sorted in «Ascending» order - A to Z (`direction=1`)

## Screenshots

![alt](http://poiz.me/screenshots/back-end-cli-screen-shot-01.jpg)

![alt](http://poiz.me/screenshots/back-end-screen-shot-01.jpg)

![alt](http://poiz.me/screenshots/back-end-screen-shot-02.jpg)

![alt](http://poiz.me/screenshots/back-end-screen-shot-03.jpg)

![alt](http://poiz.me/screenshots/back-end-screen-shot-04.jpg)

