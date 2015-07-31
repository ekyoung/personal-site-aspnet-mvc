using System.Web.Optimization;

namespace EthanYoung.PersonalWebsite.Web.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap-3.0.2/css/bootstrap.css",
                "~/Content/Common/Main.css"));

            bundles.Add(new ScriptBundle("~/bundles/slideshow").Include(
                "~/Content/Scripts/xml2json.js",
                "~/Content/SlideShow/SlideShowApp.js",
                "~/Content/SlideShow/SlideShowControllers.js"));

            bundles.Add(new ScriptBundle("~/bundles/gallery").Include(
                "~/Content/Scripts/xml2json.js",
                "~/Content/Gallery/GalleryControllers.js"));
        }
    }
}