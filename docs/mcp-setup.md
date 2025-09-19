# MCP Server Setup Guide

Complete setup instructions for the Platform ROI MCP Server with AI assistants.

## Prerequisites

- Node.js 18+ installed
- NPM or Yarn package manager
- Claude Desktop (for Claude integration)
- Terminal/command line access

## Quick Setup

### 1. Clone and Build

```bash
# Clone the repository
git clone https://github.com/achankra/platform-roi.git
cd platform-roi/mcp-server

# Install dependencies
npm install

# Build the TypeScript source
npm run build

# Test the server
node dist/index.js
```

You should see: "Platform ROI MCP Server running on stdio"

### 2. Configure Claude Desktop

**Find your Claude Desktop config file:**
- **macOS**: `~/Library/Application Support/Claude/config.json`
- **Windows**: `%APPDATA%/Claude/config.json`

**Add the MCP server configuration:**

If the file is empty or doesn't exist, create it with:
```json
{
  "mcpServers": {
    "platform-roi": {
      "command": "node",
      "args": ["./dist/index.js"],
      "cwd": "/absolute/path/to/platform-roi/mcp-server"
    }
  }
}
```

If the file already has content, add the `mcpServers` section to the existing JSON structure.

### 3. Restart Claude Desktop

1. Completely quit Claude Desktop (not just close windows)
2. Wait a few seconds
3. Reopen Claude Desktop

### 4. Test the Connection

Ask Claude: "Calculate platform engineering ROI for a team of 10 engineers"

If successful, Claude will use your MCP server to perform the calculation.

## Detailed Configuration

### Finding Your Absolute Path

Replace `/absolute/path/to/platform-roi/mcp-server` with your actual path:

```bash
cd /path/to/platform-roi/mcp-server
pwd
```

Copy the output and use it as the `cwd` value in your config.

### Example Complete Configuration

```json
{
  "scale": 0,
  "locale": "en-US",
  "userThemeMode": "system",
  "mcpServers": {
    "platform-roi": {
      "command": "node",
      "args": ["./dist/index.js"],
      "cwd": "/Users/username/projects/platform-roi/mcp-server"
    }
  }
}
```

### Multiple MCP Servers

To add more MCP servers alongside the Platform ROI server:

```json
{
  "mcpServers": {
    "platform-roi": {
      "command": "node",
      "args": ["./dist/index.js"],
      "cwd": "/path/to/platform-roi/mcp-server"
    },
    "another-server": {
      "command": "node",
      "args": ["./dist/index.js"],
      "cwd": "/path/to/another-mcp-server"
    }
  }
}
```

## Other MCP Clients

### Cursor IDE

Add to your MCP configuration in Cursor:

```json
{
  "mcpServers": {
    "platform-roi": {
      "command": "npx",
      "args": ["-y", "platform-roi-mcp-server"]
    }
  }
}
```

### Claude Code CLI

```bash
claude mcp add platform-roi -- node /path/to/platform-roi/mcp-server/dist/index.js
```

### Generic MCP Client

For other MCP-compatible clients, use:
- **Transport**: stdio
- **Command**: `node`
- **Args**: `["/path/to/platform-roi/mcp-server/dist/index.js"]`

## Troubleshooting

### Server Won't Start

**Check Node.js version:**
```bash
node --version  # Should be 18+
```

**Check build output:**
```bash
ls -la dist/
# Should show index.js and index.d.ts
```

**Rebuild if necessary:**
```bash
npm run build
```

### Claude Desktop Connection Issues

**Validate JSON syntax:**
```bash
# macOS
python3 -m json.tool ~/Library/Application\ Support/Claude/config.json

# Windows
python -m json.tool %APPDATA%/Claude/config.json
```

**Check file permissions:**
```bash
# Ensure config file is readable
ls -la ~/Library/Application\ Support/Claude/config.json
```

**Verify absolute path:**
```bash
cd /your/configured/path
node dist/index.js
```

### Common Error Messages

**"Cannot find module '@modelcontextprotocol/sdk'"**
```bash
npm install
```

**"tsc: command not found"**
```bash
npm install -g typescript
# or
npx tsc
```

**"ENOENT: no such file or directory"**
- Check that the `cwd` path in config.json is correct and absolute
- Ensure `dist/index.js` exists after building

### Debug Mode

Enable debug logging by setting environment variable:

```bash
DEBUG=mcp* node dist/index.js
```

### Testing with MCP Inspector

Install and use the MCP inspector tool:

```bash
npm install -g @modelcontextprotocol/cli
mcp-inspector stdio node dist/index.js
```

This provides a web interface to test your MCP server tools directly.

## Development Setup

### Watch Mode for Development

```bash
# Terminal 1: TypeScript compiler in watch mode
npm run dev

# Terminal 2: Test changes
node dist/index.js
```

### Custom Configuration

Modify calculation parameters by editing `src/index.ts`:

```typescript
// Adjust default values
const defaultConfig = {
  teamSize: 10,        // Change default team size
  avgSalary: 140000,   // Adjust default salary
  // ... other parameters
};
```

Remember to rebuild after changes:
```bash
npm run build
```

## Security Considerations

### Local Execution Only

The MCP server runs locally and communicates via stdio transport only. No network connections are established.

### Input Validation

All parameters are validated against defined schemas. Invalid inputs are rejected with error messages.

### No Data Storage

The server performs calculations in memory only. No user data is stored or transmitted externally.

## Performance

### Resource Usage

The MCP server has minimal resource requirements:
- Memory: ~50MB typical usage
- CPU: Low (calculation-only, no persistent processes)
- Network: None (stdio transport only)

### Calculation Speed

ROI calculations complete in milliseconds for typical team sizes (1-1000 engineers).

## Support

### Getting Help

1. Check this documentation for common issues
2. Review [MCP Tools Reference](mcp-tools.md) for usage examples
3. Create issues on GitHub repository
4. Verify setup with MCP inspector tool

### Contributing

See the main repository README for contribution guidelines. All MCP server improvements should maintain backward compatibility with existing tool interfaces.

### Updates

The MCP server version follows semantic versioning. Update with:

```bash
git pull origin main
npm install
npm run build
```

Restart Claude Desktop after updates to load the new version.