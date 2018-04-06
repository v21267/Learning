using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Venvito_Angular_3.Controllers
{
  [Produces("application/json")]
  [Route("api/MetricsData")]
  public class MetricsDataController : Controller
  {
    static public SqlConnection CreateDbConnection()
    {
      string connectionSting = Startup.ConnectionString;
      SqlConnection conn = new SqlConnection(connectionSting);
      conn.Open();
      return conn;
    }

    static public DateTime IntToDate(int date)
    {
      return DateTime.ParseExact(date.ToString(), "yyyyMMdd", null);
    }

    // GET: api/MetricsData/20180101
    [HttpGet("{date}", Name = "Get")]
    public MetricsData[] Get(int date)
    {
      List<MetricsData> list = new List<MetricsData>();
      using (SqlConnection conn = CreateDbConnection())
      {
        using (SqlCommand cmd = conn.CreateCommand())
        {
          cmd.CommandText = "usp_MetricsData_Get";
          cmd.CommandType = CommandType.StoredProcedure;
          cmd.Parameters.Add(new SqlParameter("Date", IntToDate(date)));
          using (SqlDataReader dr = cmd.ExecuteReader())
          {
            while (dr.Read())
            {
              list.Add(new MetricsData
              {
                date = date,
                code = Convert.ToString(dr["MetricsCode"]),
                description = Convert.ToString(dr["MetricsDescription"]),
                type = Convert.ToString(dr["MetricsType"]),
                color = Convert.ToString(dr["Color"]),
                value = Convert.ToDecimal(dr["MetricsValue"])
              });
            }
          }
        }
      }

      return list.ToArray<MetricsData>();
    }

    // POST: api/MetricsData
    [HttpPost]
    public void Post([FromBody]MetricsData data)
    {
      using (SqlConnection conn = CreateDbConnection())
      {
        using (SqlCommand cmd = conn.CreateCommand())
        {
          cmd.CommandText = "usp_MetricsData_Update";
          cmd.CommandType = CommandType.StoredProcedure;
          cmd.Parameters.Add(new SqlParameter("Date", IntToDate(data.date)));
          cmd.Parameters.Add(new SqlParameter("MetricsCode", data.code));
          cmd.Parameters.Add(new SqlParameter("MetricsValue", data.value));
          cmd.ExecuteNonQuery();
        }
      }
    }

    // PUT: api/MetricsData/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE: api/ApiWithActions/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }

  public class MetricsData : MetricsDefinition
  {
    public int date;
    public decimal value;
  }
}
