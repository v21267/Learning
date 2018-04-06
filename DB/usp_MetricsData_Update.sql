if OBJECT_ID('[dbo].[usp_MetricsData_Update]') is not null
	DROP PROCEDURE [dbo].[usp_MetricsData_Update]
GO

CREATE PROCEDURE [dbo].[usp_MetricsData_Update]
	@Date datetime,
	@MetricsCode varchar(50),
	@MetricsValue money
AS
BEGIN
	UPDATE
		MetricsData
	SET
		MetricsValue = @MetricsValue
	WHERE
		Date = @Date
	AND	MetricsCode = @MetricsCode

	IF @@ROWCOUNT = 0
	BEGIN
		INSERT INTO MetricsData
		(
			Date,
			MetricsCode,
			MetricsValue
		)
		SELECT
			@Date,
			@MetricsCode,
			@MetricsValue
		WHERE
			NOT EXISTS
			(
				SELECT	
					1
				FROM
					MetricsData t
				WHERE
					t.Date = @Date
				AND	t.MetricsCode = @MetricsCode
			)
		
	END
END
GO