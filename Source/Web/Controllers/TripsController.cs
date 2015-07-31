using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using EthanYoung.PersonalWebsite.Web.Models;

namespace EthanYoung.PersonalWebsite.Web.Controllers
{
    public class TripsController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        private Trip GetTrip(string trip)
        {
            var trips = new List<Trip>
            {
                new Trip {Id = "Alaska2005", Title = "Alaskan Motorcycle Trip 2005", IndexFileUrl = "http://images.ethanyoung.us/Alaska2005/Alaska2005Index.xml", RootUrl = "http://images.ethanyoung.us/Alaska2005"},
                new Trip {Id = "BettyBearHut2006", Title = "Betty Bear Hut Ski Trip", IndexFileUrl = "http://images.ethanyoung.us/BettyBearHut2006/BettyBearHut2006Index.xml", RootUrl = "http://images.ethanyoung.us/BettyBearHut2006"},
                new Trip {Id = "BinghamCanyonMine", Title = "Bingham Canyon Mine", IndexFileUrl = "http://images.ethanyoung.us/BinghamCanyonMine/Mine2005Index.xml", RootUrl = "http://images.ethanyoung.us/BinghamCanyonMine"},
                new Trip {Id = "DinosaurNM2005", Title = "Dinosaur National Monument", IndexFileUrl = "http://images.ethanyoung.us/DinosaurNM2005/DinosaurNM2005Index.xml", RootUrl = "http://images.ethanyoung.us/DinosaurNM2005"},
                new Trip {Id = "Mexico2013", Title = "Playa del Carmen, Mexico 2013", IndexFileUrl = "http://images.ethanyoung.us/Mexico2013/Mexico2013Index.xml", RootUrl = "http://images.ethanyoung.us/Mexico2013"},
                new Trip {Id = "MoabMay2006", Title = "Moab May 2006", IndexFileUrl = "http://images.ethanyoung.us/MoabMay2006/MoabMay2006Index.xml", RootUrl = "http://images.ethanyoung.us/MoabMay2006"},
                new Trip {Id = "Southwest2007", Title = "Southwest Motorcycle Trip 2007", IndexFileUrl = "http://images.ethanyoung.us/Southwest2007/Southwest2007Index.xml", RootUrl = "http://images.ethanyoung.us/Southwest2007"},
                new Trip {Id = "UncleBudHut2007", Title = "Uncle Bud Hut Ski Trip", IndexFileUrl = "http://images.ethanyoung.us/UncleBudHut2007/UncleBudHut2007Index.xml", RootUrl = "http://images.ethanyoung.us/UncleBudHut2007"},
            };

            return trips.First(x => x.Id.ToLower() == trip.ToLower());
        }

        public ActionResult Gallery(string trip)
        {
            return View(GetTrip(trip));
        }

        public ActionResult SlideShow(string trip)
        {
            return View(GetTrip(trip));
        }
    }
}
