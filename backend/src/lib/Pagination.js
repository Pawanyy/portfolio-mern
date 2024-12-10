const paginateAggregate = async (model, pipeline = [], options = {}) => {
    const { page = 1, limit = 10 } = options;

    const skip = (page - 1) * limit;

    // Add pagination stages to the pipeline
    const paginationPipeline = [
        ...pipeline,
        {
            $facet: {
                data: [{ $skip: skip }, { $limit: Number(limit) }],
                total: [{ $count: "count" }]
            }
        }
    ];

    // Execute the aggregation pipeline
    const [result] = await model.aggregate(paginationPipeline);

    // Extract results and total count
    const data = result.data;
    const total = result.total[0]?.count || 0;

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    return {
        results: data,
        currentPage: Number(page),
        totalPages,
        totalRecords: total,
        limit: Number(limit),
    };
};


export { paginateAggregate };