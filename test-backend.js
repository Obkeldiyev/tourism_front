// Simple test script to check backend connectivity
const API_BASE_URL = '/api';

async function testBackendConnection() {
  console.log('🔍 Testing backend connection...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/turs`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is running and accessible');
      console.log('📊 Response:', data);
      
      if (data.data && Array.isArray(data.data)) {
        console.log(`📋 Found ${data.data.length} tours in database`);
      } else {
        console.log('📋 No tours found or unexpected response format');
      }
    } else {
      console.log(`❌ Backend responded with status: ${response.status}`);
      const errorText = await response.text();
      console.log('Error details:', errorText);
    }
  } catch (error) {
    if (error.message.includes('fetch')) {
      console.log('❌ Backend server is not running on port 9000');
      console.log('💡 Please start the tourism backend server');
    } else {
      console.log('❌ Connection error:', error.message);
    }
  }
}

// Test file upload endpoint
async function testUploadEndpoint() {
  console.log('\n🔍 Testing upload endpoint...');
  
  try {
    // Create a simple test FormData
    const formData = new FormData();
    formData.append('title_en', 'Test Tour');
    formData.append('title_ru', 'Тестовый тур');
    formData.append('title_uz', 'Test turi');
    formData.append('title_kaa', 'Test turı');
    formData.append('description_en', 'Test description');
    formData.append('description_ru', 'Тестовое описание');
    formData.append('description_uz', 'Test tavsifi');
    formData.append('description_kaa', 'Test sıpatlaması');
    formData.append('transport', 'Bus');
    formData.append('start_date', '2024-06-01');
    formData.append('end_date', '2024-06-05');
    formData.append('cost', '100');
    formData.append('max_seats', '20');
    formData.append('breakfast', 'true');
    formData.append('lunch', 'false');
    formData.append('dinner', 'false');
    formData.append('wifi', 'true');
    
    const response = await fetch(`${API_BASE_URL}/turs`, {
      method: 'POST',
      headers: {
        // Note: You'll need a valid token for actual testing
        'token': 'your-admin-token-here'
      },
      body: formData,
    });
    
    if (response.ok) {
      console.log('✅ Upload endpoint is accessible');
    } else {
      console.log(`⚠️ Upload endpoint responded with status: ${response.status}`);
      if (response.status === 401) {
        console.log('🔐 Authentication required - this is expected without a valid token');
      }
    }
  } catch (error) {
    console.log('❌ Upload test error:', error.message);
  }
}

// Run tests
testBackendConnection().then(() => {
  testUploadEndpoint();
});