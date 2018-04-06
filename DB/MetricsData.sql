CREATE TABLE [dbo].[MetricsData]
(
	[Date] DATETIME NOT NULL , 
    [MetricsCode] VARCHAR(50) NOT NULL, 
    [MetricsValue] MONEY NOT NULL DEFAULT 0, 
    PRIMARY KEY ([Date], [MetricsCode])
)
