import React, { useEffect, useState } from 'react';
import { Card, Col, Row, message, Spin } from 'antd';


function Dashboard() {
  const [surveyData, setSurveyData] = useState(null); // To store the survey data
  const [loading, setLoading] = useState(false); // Loading state for spinner

  // Function to fetch survey data
  const fetchSurveyData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://110.38.226.9:4000/api/survey/');
      const data = await response.json();
      setSurveyData(data); // Store data in state
    } catch (error) {
      // message.error('Failed to fetch survey data');
    }
    finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSurveyData();
  }, []);

  return (
    <div className="tab-panel">
      <Spin spinning={loading}>
        <h2 style={{marginLeft:10}} >Team Data</h2>
      <Row gutter={[16, 16]}>
        {/* Display cards only if surveyData is available */}
        {surveyData && (
          <>

<Col span={8}>
              <Card className="custom-card" title="Total Vaccinated">
                {surveyData.total}
              </Card>
            </Col>
            <Col span={8}>
              <Card className="custom-card" title="Team login before 8:30">
                {surveyData['before 8:30']}
              </Card>
            </Col>

            <Col span={8}>
              <Card className="custom-card" title="Team login after 8:30">
                {surveyData['after 8:30']}
              </Card>
            </Col>

            <Col span={8}>
              <Card className="custom-card" title="Locked Houses">
                {surveyData.uniqueLockedHouseCount}
              </Card>
            </Col>

            <Col span={8}>
              <Card className="custom-card" title="Team revisited after 2PM">
                {surveyData.visitsAfter2PMCount}
              </Card>
            </Col>

            <Col span={8}>
              <Card className="custom-card" title="NA Children Count">
                {surveyData.uniqueNAChildrenCount}
              </Card>
            </Col>

            <Col span={8}>
              <Card className="custom-card" title="Revisited House Data">
                {surveyData.revisitedHouseData}
              </Card>
            </Col>

            <Col span={8}>
              <Card className="custom-card" title="School children count">
                {surveyData.school}
              </Card>
            </Col>

            <Col span={8}>
              <Card className="custom-card" title="Street children count">
                {surveyData.street}
              </Card>
            </Col>

            <Col span={8}>
              <Card className="custom-card" title="Guest Children Count">
                {surveyData.guestChild}
              </Card>
            </Col>

            <Col span={8}>
              <Card className="custom-card" title="Available Children Count">
                {surveyData.avaibleChild}
              </Card>
            </Col>

            <Col span={8}>
              <Card className="custom-card" title="Total refusal count">
              {surveyData.refusalStats.totalRefusalCount}
              </Card>
            </Col>

            {/* Refusal Stats */}
            <Col span={8}>
              <Card className="custom-card" title="Refusal reason">
                <p>Other Refusal: {surveyData.refusalStats.refusalReasons.otherRefusal}</p>
                <p>Other: {surveyData.refusalStats.refusalReasons.other}</p>
              </Card>
            </Col>
          </>
        )}
      </Row></Spin>
    </div>
  );
}

export default Dashboard;
