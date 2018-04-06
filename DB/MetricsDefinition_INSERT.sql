insert into MetricsDefinition
(
	MetricsCode,
	MetricsDescription,
	MetricsType,
	Color,
	SortOrder
)
select
	t.MetricsCode,
	t.MetricsDescription,
	t.MetricsType,
	t.Color,
	t.SortOrder
from
(
	select
		'CALLS_VOICEMAIL' as MetricsCode,
		'cold calls voicemail' as MetricsDescription,
		'COUNT' as MetricsType,
		'#FDC624' as Color,
		100 as SortOrder
	union all
	select
		'CALLS_LIVE' as MetricsCode,
		'cold calls live' as MetricsDescription,
		'COUNT' as MetricsType,
		'#00A466' as Color,
		200 as SortOrder
	union all
	select
		'APPOINTMENTS' as MetricsCode,
		'appointments booked' as MetricsDescription,
		'COUNT' as MetricsType,
		'#2A76CD' as Color,
		300 as SortOrder
	union all
	select
		'MTG_CALLS' as MetricsCode,
		'mtg: conference calls' as MetricsDescription,
		'COUNT' as MetricsType,
		'#FF9C00' as Color,
		400 as SortOrder
	union all
	select
		'MTG_INPERSON' as MetricsCode,
		'mtg: in person' as MetricsDescription,
		'COUNT' as MetricsType,
		'#C0423F' as Color,
		500 as SortOrder
	union all
	select
		'LEADS' as MetricsCode,
		'leads' as MetricsDescription,
		'COUNT' as MetricsType,
		'#00688E' as Color,
		600 as SortOrder
	union all
	select
		'PROPOSALS' as MetricsCode,
		'Proposals' as MetricsDescription,
		'AMOUNT' as MetricsType,
		'#00a466' as Color,
		700 as SortOrder
	union all
	select
		'REVENUE' as MetricsCode,
		'Revenue' as MetricsDescription,
		'AMOUNT' as MetricsType,
		'#007747' as Color,
		800 as SortOrder
) t
where not exists
(
	select 1
	  from MetricsDefinition t2
	where t2.MetricsCode = t.MetricsCode
)

