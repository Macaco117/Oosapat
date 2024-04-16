using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace WebApplication.Controllers
{
    public class TB_REPORTES_ATENCIONController : ApiController
    {

        public HttpResponseMessage Get()
        {
            string query = @"SELECT CONCAT(TB_PADRON.NOCLIENTE, ' - ', TB_PADRON.SUBCUENTA, ' - ', TB_PADRON.DERIVADA) AS CUENTA,
            TB_REPORTES_ATENCION.ID_REPORTE, TB_REPORTES_ATENCION.NOMBRE, TB_REPORTES_ATENCION.SERIE_MEDIDOR,
            TB_COLONIAS.SECTOR, TB_REPORTES_ATENCION.DIRECCION, TB_REPORTES_ATENCION.REFERENCIA,
            TB_COLONIAS.COLONIA, TB_SUBTIPODEREPORTE.SUBTIPO, TB_REPORTES_ATENCION.OBSERVACION,
            TB_REPORTES_ATENCION.FECHA, TB_REPORTES_ATENCION.VIGENCIA, TB_PERSONAL.NOMBRE,
            TB_RESPUESTAS_REPORTES.COMENTARIO_SOLUCION, TB_RESPUESTAS_REPORTES.FECHAHORA,
            TB_RESPUESTAS_REPORTES.FECHA_CAPTURA FROM TB_REPORTES_ATENCION
            LEFT JOIN TB_PADRON ON TB_REPORTES_ATENCION.SERIE_MEDIDOR = TB_PADRON.SERIE_MEDIDOR
            RIGHT JOIN TB_COLONIAS ON TB_REPORTES_ATENCION.ID_COLONIA = TB_COLONIAS.ID_COLONIA
            RIGHT JOIN TB_SUBTIPODEREPORTE ON TB_REPORTES_ATENCION.ID_SUBTIPO = TB_SUBTIPODEREPORTE.ID_SUBTIPO
            RIGHT JOIN TB_PERSONAL ON TB_REPORTES_ATENCION.ID_PERSONAL = TB_PERSONAL.ID_PERSONAL
            RIGHT JOIN TB_RESPUESTAS_REPORTES ON TB_REPORTES_ATENCION.ID_REPORTE = TB_RESPUESTAS_REPORTES.ID_REPORTE
            WHERE TB_REPORTES_ATENCION.ID_REPORTE <= 534250 AND TB_REPORTES_ATENCION.ID_REPORTE >= 534200 or TB_REPORTES_ATENCION.ID_REPORTE = 0
            ORDER BY ID_REPORTE ASC";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["OOSAPATapi"].ConnectionString))
            using (var cmd = new SqlCommand(query,con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
    }
}
