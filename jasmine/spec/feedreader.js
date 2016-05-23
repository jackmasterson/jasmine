/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have non-empty URLs', function() {
            for(var i=0; i<allFeeds.length; i++){
                var url = allFeeds[i].url;

                expect(url).toBeDefined();
                expect(url).toBeTruthy();
            }
            
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have non-empty names', function() {
            for(var i=0; i<allFeeds.length; i++){
                var name = allFeeds[i].name;

                expect(name).toBeDefined();
                expect(name).toBeTruthy();
            }
        });
    });



/* A new test suite named "The menu" */
    describe('The menu', function() {
        

        /* This test ensures the menu element is
         * hidden by default by checking if the 'body' element
         * has the 'menu-hidden' class when the page loads.
         */
        it('is hidden on default', function() {

                expect($('body').hasClass('menu-hidden')).toBe(true);
     
        });

        //sets up the toggling suite for the menu



        it('toggles when clicked', function(done) {

         
            $('.icon-list').one('click', function(){
                //gets the style of the slide-menu
                clickTwo(); 
                expect($('body').hasClass('menu-hidden')).toBe(true);

            });
            function clickTwo(){

                $('.icon-list').click(function(){
                    expect($('body').hasClass('menu-hidden')).toBe(false); 
                    done(); 

                });
                
            };
        });
    });
    
    /* a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

         /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         

         it('loadFeed has an entry', function(){
            var entryDiv = document.getElementsByClassName('entry');
            var entryDivFirst = entryDiv[0];

            expect(entryDivFirst).toBeDefined();
         });
    });

    describe('New Feed Selection', function(){

         //loads the initial feed first
         beforeEach(function(){
            loadFeed(0);
         });
    
        it('loadFeed loads properly', function(done){
            var self = this;

            //gets the HTML for the first entry of the initially loaded feed
            var entryDivFirst = document.getElementsByClassName('entry');
            var entryHTML = entryDivFirst[0].innerHTML;
        
            //loads a different feed, timesout and 
            //gets the HTML for the new feed
            //and compares the two;
            //if they're different, then it evaluates to 'true';
            //otherwise the test fails
            loadFeed(1);
            setTimeout(function(){
                self.reloadedHTML = entryDivFirst[0].innerHTML;
                self.correctLoad = entryHTML !== self.reloadedHTML;
                expect(self.correctLoad).toBe(true);
                done();
            }, 3000);
        });

    });




    /* a new test suite named "New Feed Selection"*/
  /*  describe('New Feed Selection', function(){
        var that = this;

        beforeEach(function(done){

            clearTimeout();
            var entry, feed;
            that.feedList = document.getElementsByClassName('feed-list');
            that.feedLi = that.feedList[0].children;
            entry = document.getElementsByClassName('entry');
            that.textLoad = entry[0].innerText;
            
            for(var i=0; i<that.feedLi.length; i++){
                var feedLink = that.feedLi[i].children;

                $(feedLink).click(function(){ 
                    setTimeout(function(){
                        that.textClick = entry[0].innerText;

                        if(that.textClick !== that.textLoad){
                            that.content = false;
                            done();
                        }
                    }, 2000);    
                });
            }
        });

        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
    /*    it('changes content when clicked', function(done){
            
            expect(that.content).toBe(false);
            done();
        });
    });*/

}());
