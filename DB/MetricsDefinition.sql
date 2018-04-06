CREATE TABLE [dbo].[MetricsDefinition]
(
	[MetricsCode] VARCHAR(50) NOT NULL PRIMARY KEY, 
    [MetricsDescription] VARCHAR(100) NOT NULL, 
    [MetricsType] VARCHAR(10) NOT NULL DEFAULT 'COUNT', 
    [Color] VARCHAR(30) NOT NULL, 
    [SortOrder] INT NOT NULL
)
