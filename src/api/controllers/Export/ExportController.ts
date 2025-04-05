export class ExportController {
  async export(req, res, next) {
    try {
      const { resource } = req.query;
      
      // Add validation for resource
      if (!resource) {
        return res.status(400).json({ 
          error: 'Resource parameter is required' 
        });
      }

      // Get the data to export
      const data = await this.getExportData(resource);
      
      // Add validation for data
      if (!data || !data.length) {
        return res.status(404).json({ 
          error: 'No data found to export' 
        });
      }

      // Continue with export logic
      // ...
    } catch (error) {
      next(error);
    }
  }

  async getExportData(resource) {
    // Implement your data fetching logic here
    // Make sure to return an array even if empty
    try {
      const data = await someService.getData(resource);
      return data || []; // Return empty array if data is undefined
    } catch (error) {
      throw error;
    }
  }
} 