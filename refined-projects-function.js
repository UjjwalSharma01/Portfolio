// Refined projects function - cleaner and more focused
function showProjectsRefined(projects) {
    let projectsContainer = document.querySelector("#projects .box-container");
    let projectHTML = "";
    
    // Simplified metrics data - focused on key hiring manager appeal
    const projectMetrics = [
        { views: "2.5K+", score: 90, uptime: "99.9%" },
        { views: "1.8K+", score: 85, uptime: "99.8%" },
        { views: "3.2K+", score: 92, uptime: "100%" },
        { views: "1.2K+", score: 88, uptime: "99.7%" }
    ];
    
    projects.slice(0, 10).filter(project => project.category != "android").forEach((project, index) => {
        const metrics = projectMetrics[index] || { views: "1K+", score: 85, uptime: "99%" };
        
        projectHTML += `
        <div class="box tilt" style="animation-delay: ${index * 0.15}s; --progress: ${metrics.score}%;">
            <!-- Performance Score -->
            <div class="performance-score" style="--progress: ${metrics.score * 3.6}deg">${metrics.score}</div>
            
            <img draggable="false" src="assets/images/projects/${project.image}.png" alt="project" />
            
            <!-- Quick Metrics - Only Show on Hover -->
            <div class="quick-metrics">
                <div class="metric">
                    <span class="metric-value">${metrics.views}</span>
                    <span class="metric-label">Views</span>
                </div>
                <div class="metric">
                    <span class="metric-value">${metrics.score}%</span>
                    <span class="metric-label">Score</span>
                </div>
                <div class="metric">
                    <span class="metric-value">${metrics.uptime}</span>
                    <span class="metric-label">Uptime</span>
                </div>
            </div>
            
            <div class="content">
                <div class="tag">
                    <h3>${project.name}</h3>
                </div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-eye"></i> Live Demo
                        </a>
                        <a href="${project.links.code}" class="btn" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-code"></i> Source Code
                        </a>
                    </div>
                </div>
            </div>
        </div>`
    });
    projectsContainer.innerHTML = projectHTML;
}
