using System.Web.Mvc;
using System.Web.Routing;

namespace EthanYoung.PersonalWebsite.Web.App_Start
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "TripGallery",
                url: "Trips/{trip}",
                defaults: new { controller = "Trips", action = "Gallery" }
            );

            routes.MapRoute(
                name: "TripSlideShow",
                url: "Trips/{trip}/Slideshow.aspx",
                defaults: new { controller = "Trips", action = "SlideShow" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}