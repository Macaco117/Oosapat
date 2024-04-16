using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApplication.Models;

namespace WebApplication.Controllers

{
    public class TB_RESPUESTAS_REPORTESController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"select ID_REPORTE, ID_SOLUCION, OBSERVACION     
            from dbo.TB_RESPUESTAS_REPORTES
            WHERE ID_REPORTE <= 534250 and ID_REPORTE >= 534200 or ID_REPORTE = 0
            ORDER BY ID_REPORTE ASC";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["OOSAPATapi"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
            
        public string Put(TB_RESPUESTAS_REPORTES res)
        {
            try
            {
                string query = @"
                update dbo.TB_RESPUESTAS_REPORTES set
                ID_SOLUCION ='" + res.ID_SOLUCION + @"',
                OBSERVACION ='" + res.OBSERVACION + @"'
                where ID_REPORTE =" + res.ID_REPORTE + @"";

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["OOSAPATapi"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Actualizado Correctamente";
            }
            catch (Exception)
            {
                return "Fallo";
            }
        }

        [Route("api/TB_RESPUESTAS_REPORTES/SaveFile")]

        public string SaveFile()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = HttpContext.Current.Server.MapPath("~/Photos/" + filename);

                postedFile.SaveAs(physicalPath);

                return filename;
            }
            catch
            {
                return "No";
            }
        }
    }
}