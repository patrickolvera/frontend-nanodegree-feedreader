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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
    
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('has a defined url', () => {
            allFeeds.forEach( feed => {
                expect(feed.url).not.toBe('');
                expect(feed.url).toContain('http');
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('has a defined name', () => {
            allFeeds.forEach( feed => {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toEqual('string');
                expect(feed.name).not.toBe('');
            });
        });
        
    });

    describe('The menu', () => {
        
        /* A test that ensures the menu element is
         * hidden by default.
         */
        const checkIfHidden = () => $('body').hasClass('menu-hidden');

        it('is hidden by default', () => {
            expect(checkIfHidden()).toEqual(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */

        it('changes visibility when icon is clicked', () => {
            const menuIcon = $('.menu-icon-link');
            const clickMenuIcon = () => menuIcon.click();
        
            clickMenuIcon();
            expect(checkIfHidden()).toEqual(false);

            clickMenuIcon();
            expect(checkIfHidden()).toEqual(true);
        });
        
    });

    describe('Initial Entries', () => {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach( done => {
            loadFeed(0, done);
        });
        
        it('should have at least 1 entry', (done) => {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    describe('New Feed Selection', () => {
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        const feedArticles = [];
        const getFeedArticle = () => feedArticles.push($('.feed').html());
    
        beforeEach( done => {

            loadFeed(0, () => {
                getFeedArticle();
                loadFeed(1, done);
            });

        });

        it('loads unique feed articles', () => {
            getFeedArticle();
            expect(feedArticles[0]).not.toBe(feedArticles[1]);
        });
    });
        
}());
