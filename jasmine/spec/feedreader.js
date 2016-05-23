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
            for (var i = 0; i < allFeeds.length; i++) {
                var url = allFeeds[i].url;

                expect(url).toBeDefined();
                expect(url.length).toBeGreaterThan(0);
            }

        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have non-empty names', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                var name = allFeeds[i].name;

                expect(name).toBeDefined();
                expect(name.length).toBeGreaterThan(0);
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



        it('toggles when clicked', function() {

            
            //emulates clicking on the menu
            $('.menu-icon-link').click();
            //gets the style of the body
            expect($('body').hasClass('menu-hidden')).toBe(false);
            
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

      

        });
    });

    /* a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            var self = this;
            loadFeed(0, function(){
                //grabs the elements with the class 'entry', which
                //load asynchronously, necessitating the use of 'done()'
                self.entryDiv = document.getElementsByClassName('entry');
                done();
            });
            
        });

        it('loadFeed has an entry', function(done) {
            //asynchronously checks if the length of the entry divs array
            //is greater than 0, meaning that they exist and have loaded
            expect(this.entryDiv.length).toBeGreaterThan(0);
            done();

        });
    });

    describe('New Feed Selection', function() {

        
        beforeEach(function(done) {
            var self = this;
            //loads the initial feed first
            loadFeed(0, function(){
                //gets the innerHTML of the initial feed
                var firstFeedEntry = document.getElementsByClassName('entry');
                self.firstHTML = firstFeedEntry[0].innerHTML;

                //loads the second feed and gets the innerHTML, all
                //asynchronously
                loadFeed(1, function(){
                    var secondFeedEntry = document.getElementsByClassName('entry');
                    self.secondHTML = secondFeedEntry[0].innerHTML;
                    done();
                })
            })

        });

        it('loadFeed loads properly', function(done) {
            //compares the first innerHTML to the second
            var doesNotEqual = this.firstHTML !== this.secondHTML;
            
            //if they're equal, the test fails; if not, it passes
            //also asynchronously
            expect(doesNotEqual).toBe(true);
            done();
        });

    });

}());