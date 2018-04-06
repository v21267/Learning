using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.AspNetCore.Hosting;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Venvito_Angular_3
{
  [Produces("application/json")]
  [Route("api/MetricsDictionary")]
  public class MetricsDictionaryController : Controller
  {
    private readonly IHostingEnvironment m_HostingEnvironment;

    public MetricsDictionaryController(IHostingEnvironment hostingEnvironment)
    {
      m_HostingEnvironment = hostingEnvironment;
    }

    // GET: api/MetricsDictionary
    [HttpGet]
    [Produces("application/json")]
    public ContentResult Get()
    {
      string contentRootPath = m_HostingEnvironment.ContentRootPath;
      var json = System.IO.File.ReadAllText(Path.Combine(contentRootPath, "App_Data/MetricsDefinitions.json"));
      return Content(json);
    }
  }

  public class MetricsDefinition
  {
    public string code;
    public string description;
    public string type;
    public string color;
  }
}
