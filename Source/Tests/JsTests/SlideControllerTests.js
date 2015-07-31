describe('Slide Show Controllers', function () {
    beforeEach(module('slideShowApp'));

    describe('slideController', function() {
        var $scope, $routeParams, $location, slideData, createController;

        var slideShowRootUrl = 'http://server.com/MyTrip';

        beforeEach(inject(function ($injector) {
            $scope = $injector.get('$rootScope');

            $routeParams = $injector.get('$routeParams');
            
            $location = $injector.get('$location');

            slideData = {};

            // The $controller service is used to create instances of controllers
            var $controller = $injector.get('$controller');

            createController = function () {
                return $controller('slideController', { $scope: $scope, $routeParams: $routeParams, $location: $location, slideShowRootUrl: slideShowRootUrl, slideData: slideData });
            };
        }));

        it('should set slideData.firstSlideId from routeParams when given no slides', function () {
            var slideId = 'slide1';
            var slides = [];

            $routeParams.slideId = slideId;
            slideData.slides = slides;

            var controller = createController();

            expect(slideData.firstSlideId).toBe(slideId);
        });

        it('should redirect to loading when given no slides', function () {
            var slides = [];

            slideData.slides = slides;

            var controller = createController();

            expect($location.path()).toBe('/loading');
        });

        it('should set scope.slide to the first slide when given slideId "first"', inject(function ($location, $controller) {
            var slideId = 'first';
            var firstSlide = { ImageId: 'slide1', FileName: 'image1.jpg' };
            var slides = [firstSlide];

            $routeParams.slideId = slideId;
            slideData.slides = slides;
            var controller = createController();

            expect($scope.slide).toBe(firstSlide);
        }));

        it('should set scope.slide to the slide with the specified id when given specific slideId', function () {
            var slideId = 'slide2';
            var slide1 = { ImageId: 'slide1', FileName: 'image1.jpg' };
            var slide2 = { ImageId: slideId, FileName: 'image2.jpg' };
            var slides = [slide1, slide2];

            $routeParams.slideId = slideId;
            slideData.slides = slides;
            var controller = createController();

            expect($scope.slide).toBe(slide2);
        });

        it('should set the WebSizeImageUrl of the current slide when given any slide', inject(function ($location, $controller) {
            var currentSlide = { ImageId: 'slide1', FileName: 'image1.jpg' };
            var slides = [currentSlide];

            $routeParams.slideId = 'first';
            slideData.slides = slides;
            var controller = createController();

            expect(currentSlide.WebSizeImageUrl).toBe(slideShowRootUrl + '/WebSize/' + currentSlide.FileName);
        }));

        it('should disable the previous button when showing the first slide', function () {
            var slideId = 'slide1';
            var firstSlide = { ImageId: 'slide1', FileName: 'image1.jpg' };
            var middleSlide = { ImageId: 'slide2', FileName: 'image2.jpg' };
            var lastSlide = { ImageId: 'slide3', FileName: 'image3.jpg' };
            var slides = [firstSlide, middleSlide, lastSlide];

            $routeParams.slideId = slideId;
            slideData.slides = slides;
            var controller = createController();

            expect($scope.previousSlide).toBe(null);
            expect($scope.previousButtonHref).toBe(null);
            expect($scope.previousButtonClass).toBe('PreviousDisabled');
        });

        it('should enable the previous button when not showing the first slide', function () {
            var slideId = 'slide2';
            var firstSlide = { ImageId: 'slide1', FileName: 'image1.jpg' };
            var middleSlide = { ImageId: 'slide2', FileName: 'image2.jpg' };
            var lastSlide = { ImageId: 'slide3', FileName: 'image3.jpg' };
            var slides = [firstSlide, middleSlide, lastSlide];

            $routeParams.slideId = slideId;
            slideData.slides = slides;
            var controller = createController();

            expect($scope.previousSlide).toBe(firstSlide);
            expect($scope.previousButtonHref).toBe('#/slides/' + firstSlide.ImageId);
            expect($scope.previousButtonClass).toBe('Previous');
        });

        it('should disable the next button when showing the last slide', function () {
            var slideId = 'slide3';
            var firstSlide = { ImageId: 'slide1', FileName: 'image1.jpg' };
            var middleSlide = { ImageId: 'slide2', FileName: 'image2.jpg' };
            var lastSlide = { ImageId: 'slide3', FileName: 'image3.jpg' };
            var slides = [firstSlide, middleSlide, lastSlide];

            $routeParams.slideId = slideId;
            slideData.slides = slides;
            var controller = createController();

            expect($scope.nextSlide).toBe(null);
            expect($scope.nextButtonHref).toBe(null);
            expect($scope.nextButtonClass).toBe('NextDisabled');
        });

        it('should enable the next button when not showing the last slide', function () {
            var slideId = 'slide2';
            var firstSlide = { ImageId: 'slide1', FileName: 'image1.jpg' };
            var middleSlide = { ImageId: 'slide2', FileName: 'image2.jpg' };
            var lastSlide = { ImageId: 'slide3', FileName: 'image3.jpg' };
            var slides = [firstSlide, middleSlide, lastSlide];

            $routeParams.slideId = slideId;
            slideData.slides = slides;
            var controller = createController();

            expect($scope.nextSlide).toBe(lastSlide);
            expect($scope.nextButtonHref).toBe('#/slides/' + lastSlide.ImageId);
            expect($scope.nextButtonClass).toBe('Next');
        });
        
    });

    describe('loadingController', function () {
        var $httpBackend, $location, slideData, createController;

        var slideShowIndexFileUrl = 'http://server.com/MyTrip/index.xml';
        var xmlForTwoSlides = '<?xml version="1.0"?><ImagesDataSet xmlns="http://schemas.ethanyoung.us/ImageManipulation/ImagesDataSet.xsd"><Images><ImageId>ee669783-cfe7-422d-bd1b-1eb28cbe7567</ImageId><FileName>In-Pit Ore Crusher.JPG</FileName><Title>In-Pit Ore Crusher</Title><DateTaken>2005-10-29T10:48:23-06:00</DateTaken><HasThumbnail>true</HasThumbnail><HasFullSize>true</HasFullSize><Description>A pretty short description.</Description></Images><Images><ImageId>53379c80-b07d-4f85-a3a5-dbde6d64ecb7</ImageId><FileName>Jeanine and Big Tire.JPG</FileName><Title>Jeanine and Big Tire</Title><DateTaken>2005-10-29T10:49:20-06:00</DateTaken><HasThumbnail>true</HasThumbnail><HasFullSize>true</HasFullSize></Images></ImagesDataSet>';
        var xmlForOneSlide = '<?xml version="1.0"?><ImagesDataSet xmlns="http://schemas.ethanyoung.us/ImageManipulation/ImagesDataSet.xsd"><Images><ImageId>ee669783-cfe7-422d-bd1b-1eb28cbe7567</ImageId><FileName>In-Pit Ore Crusher.JPG</FileName><Title>In-Pit Ore Crusher</Title><DateTaken>2005-10-29T10:48:23-06:00</DateTaken><HasThumbnail>true</HasThumbnail><HasFullSize>true</HasFullSize><Description>A pretty short description.</Description></Images></ImagesDataSet>';

        beforeEach(inject(function ($injector) {
            // Set up the mock http service responses
            $httpBackend = $injector.get('$httpBackend');

            $location = $injector.get('$location');
            
            slideData = {};
            
            // The $controller service is used to create instances of controllers
            var $controller = $injector.get('$controller');

            createController = function() {
                return $controller('loadingController', { slideShowIndexFileUrl: slideShowIndexFileUrl, slideData: slideData });
            };
        }));

        it('should set a list of slides on slide data when given xml for two slides', function () {
            $httpBackend.when('GET', slideShowIndexFileUrl).respond(xmlForTwoSlides);
            var controller = createController();
            $httpBackend.flush();
            
            expect(slideData.slides.length).toBe(2);
        });

        it('should set a list of slides on slide data when given xml for one slide', function () {
            $httpBackend.when('GET', slideShowIndexFileUrl).respond(xmlForOneSlide);
            var controller = createController();
            $httpBackend.flush();
            
            expect(slideData.slides.length).toBe(1);
        });

        it('should redirect to the first slide when given no specific first slide id', function () {
            $httpBackend.when('GET', slideShowIndexFileUrl).respond(xmlForTwoSlides);
            var controller = createController();
            $httpBackend.flush();
            
            expect($location.path()).toBe('/slides/first');
        });

        it('should redirect to a specific slide when given a specific first slide id', function () {
            var slideId = '53379c80-b07d-4f85-a3a5-dbde6d64ecb7';
            slideData.firstSlideId = slideId;
            
            $httpBackend.when('GET', slideShowIndexFileUrl).respond(xmlForTwoSlides);
            var controller = createController();
            $httpBackend.flush();
            
            expect($location.path()).toBe('/slides/' + slideId);
        });

    });
});
