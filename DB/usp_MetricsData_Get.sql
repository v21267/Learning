if OBJECT_ID('[dbo].[usp_MetricsData_Get]') is not null
	DROP PROCEDURE [dbo].[usp_MetricsData_Get]
GO

CREATE PROCEDURE [dbo].[usp_MetricsData_Get]
	@date datetime
AS
BEGIN
	SELECT
		def.MetricsCode,
		def.MetricsDescription,
		def.MetricsType,
		def.Color,
		COALESCE(d.MetricsValue, 0) AS MetricsValue
	FROM
		MetricsDefinition def
	LEFT OUTER JOIN
		MetricsData d ON d.MetricsCode = def.MetricsCode
					 AND d.Date = @Date
	ORDER BY
		def.SortOrder
END
GO