ALTER TABLE [dbo].[MetricsData]
	ADD CONSTRAINT [MetricsData_MetricsDefinition_FK]
	FOREIGN KEY (MetricsCode)
	REFERENCES [MetricsDefinition] (MetricsCode)
