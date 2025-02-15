document.addEventListener('DOMContentLoaded', function () {
    function initializeCytoscape() {
        if (typeof cytoscape === 'undefined') {
            console.error('Cytoscape.js is not loaded.');
            return;
        }
        
        fetch('php/get_user_info.php')
            .then(response => response.json())
            .then(data => {
                console.log('User data received:', data);
                
                if (data.error) {
                    alert(data.error);
                } else {
                    function formatBirthDate(day, month, year) {
                        const months = [
                            "January", "February", "March", "April", "May", "June", 
                            "July", "August", "September", "October", "November", "December"
                        ];
                        return `${months[month - 1]} ${day}, ${year}`;
                    }
                    
                    const birthDate = (data.day && data.month && data.year) 
                        ? formatBirthDate(data.day, data.month, data.year) 
                        : '';
                    
                    console.log('Formatted Birth Date:', birthDate);
                    
                    var cy = cytoscape({
                        container: document.getElementById('cy'),
                        elements: [
                            { 
                                data: { 
                                    id: 'user', 
                                    label: `${data.first_name}\n${data.last_name}\n\n${birthDate}`
                                } 
                            }
                        ],
                        style: [
                            {
                                selector: 'node',
                                style: {
                                    'background-image': 'img/default-profile-picture.png',
                                    'background-fit': 'cover',
                                    'border-color': '#ccc',
                                    'border-width': '2px',
                                    'border-opacity': 1,
                                    'label': 'data(label)',
                                    'text-opacity': 0.5,
                                    'text-valign': 'bottom',
                                    'text-halign': 'center',
                                    'text-margin-y': '10px',
                                    'background-color': '#f0f0f0',
                                    'color': '#000',
                                    'width': '80px',
                                    'height': '80px',
                                    'font-size': '12px',
                                    'text-wrap': 'wrap',
                                    'text-max-width': '80px',
                                }
                            }
                        ],
                        layout: {
                            name: 'grid'
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }
    
    setTimeout(initializeCytoscape, 500);
});