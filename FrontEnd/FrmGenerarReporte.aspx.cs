using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BackEnd.Modelo;
namespace FrontEnd
{
    public partial class FrmGenerarReporte : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReportViewer1.LocalReport.ReportPath = "ReporteListaResidencias.rdlc";
                List<DatosContacto> datos = new ws.WSEmpresas().getAllEmpresas();
                datos.Add(new DatosContacto { nombre = "nueva", domicilio = "nueva" });
                Microsoft.Reporting.WebForms.ReportDataSource rds1 =
               new Microsoft.Reporting.WebForms.ReportDataSource("DataSet1", datos);
                ReportViewer1.LocalReport.DataSources.Clear();
                ReportViewer1.LocalReport.DataSources.Add(rds1);
                ReportViewer1.LocalReport.Refresh();
            }
        }
    }
}