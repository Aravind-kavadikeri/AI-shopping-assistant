/**
 * =========================================================================
 * AI Shopping Assistant - Minimalist Deep Teal + Coral BI Charts
 * Light & Dark theme aware, Canvas & DOM chart components.
 * Obtains all values dynamically from Store.merchant (populated by /api/analytics.php)
 * =========================================================================
 */

const AnalyticsCharts = {
  // Check whether dark mode is currently active
  isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  },

  // Colors dictionary based on active theme
  getThemePalette() {
    const dark = this.isDark();
    return {
      grid: dark ? '#304448' : '#E3E9E7',
      text: dark ? '#A5B5B5' : '#77868A',
      primaryLine: dark ? '#42AAA5' : '#168C91',
      secondaryLine: dark ? '#168C91' : '#123D46',
      coralAccent: '#F07861',
      coralSoft: '#F5A08D',
      bgPoint: dark ? '#17272B' : '#FFFFFF',
      areaGradientStart: dark ? 'rgba(66, 170, 165, 0.28)' : 'rgba(22, 140, 145, 0.22)',
      areaGradientEnd: 'rgba(22, 140, 145, 0.0)'
    };
  },

  // 1. Render animated revenue line chart from database metrics
  renderRevenueChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 550;
    const height = canvas.height = 240;

    const palette = this.getThemePalette();

    // Read directly from dynamic store state (populated from SQL queries)
    const trend = (Store.merchant.charts && Store.merchant.charts.revenueTrend) 
      ? Store.merchant.charts.revenueTrend 
      : { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], values: [4999, 3899, 60698, 3499, 6499, 7798, 4999] };

    const labels = trend.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = trend.values || [4999, 3899, 60698, 3499, 6499, 7798, 4999];

    const padding = { top: 25, right: 30, bottom: 35, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...data, 10000) * 1.15;

    ctx.clearRect(0, 0, width, height);

    // Draw horizontal grid lines
    ctx.strokeStyle = palette.grid;
    ctx.lineWidth = 1;
    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
      const y = padding.top + (chartH / gridSteps) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Numeric labels
      const val = Math.round(maxVal - (maxVal / gridSteps) * i);
      ctx.fillStyle = palette.text;
      ctx.font = '10px Inter, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('₹' + (val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val), padding.left - 8, y + 3);
    }

    if (data.length === 0) return;

    // Calculate Coordinates
    const points = data.map((val, idx) => {
      const x = data.length === 1 
        ? padding.left + chartW / 2 
        : padding.left + (chartW / (data.length - 1)) * idx;
      const y = padding.top + chartH - (val / maxVal) * chartH;
      return { x, y, val, label: labels[idx] || '' };
    });

    // Draw filled area gradient
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, palette.areaGradientStart);
    gradient.addColorStop(1, palette.areaGradientEnd);

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding.bottom);
    points.forEach((p, i) => {
      if (i === 0) {
        ctx.lineTo(p.x, p.y);
      } else {
        const prev = points[i - 1];
        const cx = (prev.x + p.x) / 2;
        ctx.bezierCurveTo(cx, prev.y, cx, p.y, p.x, p.y);
      }
    });
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw smooth line
    ctx.beginPath();
    points.forEach((p, i) => {
      if (i === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        const prev = points[i - 1];
        const cx = (prev.x + p.x) / 2;
        ctx.bezierCurveTo(cx, prev.y, cx, p.y, p.x, p.y);
      }
    });
    ctx.strokeStyle = palette.primaryLine;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Find peak value point to highlight with Coral
    let peakIndex = 0;
    let peakVal = -1;
    data.forEach((v, i) => {
      if (v > peakVal) {
        peakVal = v;
        peakIndex = i;
      }
    });

    // Draw node dots & x-axis labels
    points.forEach((p, idx) => {
      const isPeak = (idx === peakIndex && data.length > 1);
      ctx.beginPath();
      ctx.arc(p.x, p.y, isPeak ? 5.5 : 4, 0, Math.PI * 2);
      ctx.fillStyle = isPeak ? palette.coralAccent : palette.bgPoint;
      ctx.strokeStyle = isPeak ? palette.coralAccent : palette.primaryLine;
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isPeak ? palette.coralAccent : palette.text;
      ctx.font = isPeak ? 'bold 11px Inter, sans-serif' : '11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.label, p.x, height - 10);
    });
  },

  // 2. Render Category Breakdown Bars from database query
  renderCategoryBars(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const catData = (Store.merchant.charts && Store.merchant.charts.categorySales)
      ? Store.merchant.charts.categorySales
      : { labels: ['Laptops & Computers', 'Footwear', 'Outdoor Gear', 'Electronics', 'Bags & Accessories', 'Wearables', 'Smart Living'], percentages: [52, 12, 8, 11, 4, 6, 7], values: [58199, 11697, 6499, 9998, 2499, 3499, 4999] };

    // Disciplined Deep Teal + Coral Palette
    const colors = ['#123D46', '#168C91', '#42AAA5', '#F07861', '#F5A08D', '#248A62', '#D99536'];
    const dark = this.isDark();
    const trackBg = dark ? '#20363A' : '#EBE5D8';
    const textLabel = dark ? '#F4F7F5' : '#17272B';
    const textSub = dark ? '#A5B5B5' : '#77868A';

    container.innerHTML = catData.labels.map((label, idx) => {
      const pct = catData.percentages ? (catData.percentages[idx] || 10) : 10;
      const val = catData.values ? catData.values[idx] : null;
      const color = dark && idx === 0 ? '#42AAA5' : colors[idx % colors.length];

      return `
        <div style="margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
            <span style="color: ${textLabel}; font-weight: 600;">${label}</span>
            <div style="display: flex; gap: 8px;">
              ${val ? `<span style="color: ${textSub}; font-size: 0.8rem;">₹${val.toLocaleString()}</span>` : ''}
              <span style="color: ${color}; font-weight: 700;">${pct}% GMV</span>
            </div>
          </div>
          <div style="width: 100%; height: 8px; background: ${trackBg}; border-radius: 99px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: ${color}; border-radius: 99px; transition: width 0.8s ease;"></div>
          </div>
        </div>
      `;
    }).join('');
  },

  // 3. Render Peak Shopping Hours Curve
  renderPeakHoursChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 550;
    const height = canvas.height = 180;

    const palette = this.getThemePalette();

    const peakData = (Store.merchant.charts && Store.merchant.charts.peakHours)
      ? Store.merchant.charts.peakHours
      : { labels: ['8AM', '11AM', '2PM', '5PM', '8PM', '11PM'], traffic: [120, 680, 590, 890, 1420, 410] };

    const hours = peakData.labels;
    const traffic = peakData.traffic;

    const padding = { top: 20, right: 25, bottom: 30, left: 40 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...traffic) * 1.15;

    ctx.clearRect(0, 0, width, height);

    // Draw horizontal grid lines
    ctx.strokeStyle = palette.grid;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = padding.top + (chartH / 3) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    const points = traffic.map((val, idx) => {
      const x = padding.left + (chartW / (traffic.length - 1)) * idx;
      const y = padding.top + chartH - (val / maxVal) * chartH;
      return { x, y, val, label: hours[idx] };
    });

    ctx.beginPath();
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else {
        const prev = points[i - 1];
        const cx = (prev.x + p.x) / 2;
        ctx.bezierCurveTo(cx, prev.y, cx, p.y, p.x, p.y);
      }
    });
    ctx.strokeStyle = palette.primaryLine;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Highlight peak hour with Coral
    let maxIdx = 0;
    let maxT = -1;
    traffic.forEach((t, i) => { if (t > maxT) { maxT = t; maxIdx = i; } });

    points.forEach((p, idx) => {
      const isPeak = idx === maxIdx;
      ctx.beginPath();
      ctx.arc(p.x, p.y, isPeak ? 5 : 3.5, 0, Math.PI * 2);
      ctx.fillStyle = isPeak ? palette.coralAccent : palette.primaryLine;
      ctx.fill();

      ctx.fillStyle = isPeak ? palette.coralAccent : palette.text;
      ctx.font = isPeak ? 'bold 10px Inter, sans-serif' : '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.label, p.x, height - 8);
    });
  }
};
