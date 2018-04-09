if OBJECT_ID('[dbo].[usp_MetricsChart_Get]') is not null
	DROP PROCEDURE [dbo].[usp_MetricsChart_Get]
GO

CREATE PROCEDURE [dbo].[usp_MetricsChart_Get]
	@DateRange varchar(10)
AS
BEGIN
	SET XACT_ABORT ON
	
	DECLARE @PeriodCount int
	DECLARE @I int
	DECLARE @Date1 datetime
	DECLARE @Date2 datetime
	DECLARE @Month int
	DECLARE @MetricsCode varchar(50)

	DECLARE @ChartPeriod TABLE
	(
		StartDate datetime,
		EndDate dateTime,
		PeriodName varchar(50)
	)

	DECLARE @T TABLE
	(
		MetricsCode varchar(50),
		StartDate datetime,
		PeriodName varchAR(50),
		MetricsValue money
	)
	
	IF @DateRange IN ('7', '30')
	BEGIN
		SET @PeriodCount = CAST(@DateRange AS int)
		SET @Date1 = CONVERT(datetime, CONVERT(varchar, GETDATE(), 112), 112)
		SET @I = 0
		WHILE @I < @PeriodCount
		BEGIN
			INSERT INTO @ChartPeriod
			(
				StartDate,
				EndDate,
				PeriodName
			)
			VALUES
			(
				@Date1,
				@Date1,
				(CASE WHEN @DateRange = '7'
					  THEN LEFT(DATENAME(dw, @Date1), 1)
					  ELSE CAST(DATEPART(month, @Date1) AS varchar) + '/' + 
						   CAST(DATEPART(day, @Date1) AS varchar) + '/' + 
						   RIGHT(CAST(DATEPART(year, @Date1) AS varchar), 2)
				 END)
			)
			
			SET @Date1 = DATEADD(day, -1, @Date1)
			SET @I = @I + 1
		END
	END
	ELSE IF @DateRange = 'M'
	BEGIN
		SET @Date1 = CONVERT(datetime, LEFT(CONVERT(varchar, GETDATE(), 112), 6) + '01', 112)
		SET @Date2 = DATEADD(month, 1, @Date1) - 1
		SET @I = 0
		WHILE @I < 7
		BEGIN
			INSERT INTO @ChartPeriod
			(
				StartDate,
				EndDate,
				PeriodName
			)
			VALUES
			(
				@Date1,
				@Date2,
				LEFT(DATENAME(m, @Date1), 3) + '-' + RIGHT(CAST(DATEPART(year, @Date1) AS varchar), 2)
			)
			
			SET @Date1 = DATEADD(month, -1, @Date1)
			SET @Date2 = DATEADD(month, 1, @Date1) - 1
			SET @I = @I + 1
		END
	END
	ELSE IF @DateRange = 'Q'
	BEGIN
		SET @Date1 = GETDATE()
		SET @Month = DATEPART(month, @Date1)
		SET @Month = ((@Month - 1) / 3 + 1) * 3 - 2
		SET @Date1 = CAST(
		    CAST(@Month AS varchar) + '/1/' +
			CAST(DATEPART(year, @Date1) AS varchar)
		    AS datetime)
		SET @Date2 = DATEADD(month, 3, @Date1) - 1
		SET @I = 0
		WHILE @I < 5
		BEGIN
			INSERT INTO @ChartPeriod
			(
				StartDate,
				EndDate,
				PeriodName
			)
			VALUES
			(
				@Date1,
				@Date2,
				'Q' + LEFT(DATENAME(q, @Date1), 3) + '-' + RIGHT(CAST(DATEPART(year, @Date1) AS varchar), 2)
			)
			
			SET @Date1 = DATEADD(month, -3, @Date1)
			SET @Date2 = DATEADD(month, 3, @Date1) - 1
			SET @I = @I + 1
		END
	END
	
	INSERT INTO	@T
	(
		MetricsCode,
		StartDate,
		PeriodName,
		MetricsValue
	)
	SELECT 
		def.MetricsCode,
		cp.StartDate,
		cp.PeriodName,
		COALESCE(SUM(md.MetricsValue), 0) AS MetricsValue
	FROM
		MetricsDefinition def
	CROSS JOIN
		@ChartPeriod cp
	LEFT OUTER JOIN 
		MetricsData md ON md.Date BETWEEN cp.StartDate and cp.EndDate
					  AND md.MetricsCode = def.MetricsCode
     GROUP BY 
		cp.StartDate, 
		cp.PeriodName,
		def.MetricsCode,
		def.SortOrder
	ORDER BY
		def.SortOrder,
		cp.StartDate
	
	SELECT
		def.MetricsCode,
		def.MetricsDescription,
		def.MetricsType,
		def.Color,
		SUM(COALESCE(t.MetricsValue, 0)) AS MetricsValue
	FROM
		MetricsDefinition def
	LEFT OUTER JOIN
		@T t ON t.MetricsCode = def.MetricsCode
	GROUP BY
		def.MetricsCode,
		def.MetricsDescription,
		def.MetricsType,
		def.Color,
		def.SortOrder
	ORDER BY
		def.SortOrder
		
	DECLARE cur CURSOR FOR
		SELECT
			def.MetricsCode
		FROM
			MetricsDefinition def
		ORDER BY
			def.SortOrder
	OPEN cur
	FETCH cur INTO @MetricsCode
	WHILE @@FETCH_STATUS = 0
	BEGIN
		SELECT
			t.MetricsCode,
			t.StartDate,
			t.PeriodName,
			t.MetricsValue
		FROM
			@T t
		WHERE
			t.MetricsCode = @MetricsCode
		ORDER BY
			t.StartDate
		
		FETCH cur INTO @MetricsCode
	END
	CLOSE cur
	DEALLOCATE cur


	SET XACT_ABORT OFF
END
GO