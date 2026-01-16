import React, { useState, useEffect } from 'react';
import { Star, Mail, Phone, Calendar, Trash2, Eye, MessageSquare, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  getContactSubmissions, 
  updateSubmissionStatus, 
  deleteContactSubmission, 
  getSubmissionStats,
  type ContactSubmission 
} from '@/data/contactSubmissions';

const ContactSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
  const [stats, setStats] = useState({ total: 0, new: 0, averageRating: 0 });

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const allSubmissions = getContactSubmissions();
    setSubmissions(allSubmissions);
    setStats(getSubmissionStats());
  };

  const filteredSubmissions = submissions.filter(sub => 
    filter === 'all' || sub.status === filter
  );

  const handleStatusChange = (id: string, status: ContactSubmission['status']) => {
    updateSubmissionStatus(id, status);
    loadSubmissions();
    if (selectedSubmission?.id === id) {
      setSelectedSubmission({ ...selectedSubmission, status });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      deleteContactSubmission(id);
      loadSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: ContactSubmission['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Submissions</p>
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New Messages</p>
              <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
            </div>
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-yellow-600">{stats.averageRating}</p>
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions List */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Contact Submissions</h3>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="text-sm border border-border rounded px-2 py-1"
                >
                  <option value="all">All</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredSubmissions.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                No submissions found
              </div>
            ) : (
              filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedSubmission?.id === submission.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{submission.name}</h4>
                      <p className="text-sm text-muted-foreground">{submission.email}</p>
                    </div>
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm font-medium mb-1">{submission.subject}</p>
                  <div className="flex items-center justify-between">
                    {renderStars(submission.rating)}
                    <span className="text-xs text-muted-foreground">
                      {formatDate(submission.submittedAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submission Details */}
        <div className="bg-card rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold">Submission Details</h3>
          </div>
          
          {selectedSubmission ? (
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-medium">{selectedSubmission.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {selectedSubmission.email}
                    </div>
                    {selectedSubmission.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {selectedSubmission.phone}
                      </div>
                    )}
                  </div>
                </div>
                <Badge className={getStatusColor(selectedSubmission.status)}>
                  {selectedSubmission.status}
                </Badge>
              </div>

              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">Subject</p>
                <p className="font-medium">{selectedSubmission.subject}</p>
              </div>

              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">Rating</p>
                {renderStars(selectedSubmission.rating)}
              </div>

              <div>
                <p className="font-medium text-sm text-muted-foreground mb-1">Message</p>
                <p className="text-sm leading-relaxed bg-muted p-3 rounded-lg">
                  {selectedSubmission.message}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Submitted: {formatDate(selectedSubmission.submittedAt)}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusChange(selectedSubmission.id, 'read')}
                  disabled={selectedSubmission.status === 'read'}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Mark as Read
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(selectedSubmission.id, 'replied')}
                  disabled={selectedSubmission.status === 'replied'}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Mark as Replied
                </Button>
                
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(selectedSubmission.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              Select a submission to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSubmissions;