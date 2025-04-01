import React, { useState } from 'react';
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface TelemedicineConsultProps {
  doctorName?: string;
  appointmentTime?: string;
  isActive?: boolean;
}

const TelemedicineConsult: React.FC<TelemedicineConsultProps> = ({
  doctorName = 'Dr. Sarah Wilson',
  appointmentTime = '2:30 PM',
  isActive = false,
}) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast.info(`Video ${isVideoOn ? 'disabled' : 'enabled'}`);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    toast.info(`Audio ${isAudioOn ? 'muted' : 'unmuted'}`);
  };

  const startCall = () => {
    setIsInCall(true);
    toast.success('Joining telemedicine session...');
  };

  const endCall = () => {
    setIsInCall(false);
    toast.info('Call ended');
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Telemedicine Session</span>
              {isInCall && (
                <span className="text-sm text-red-500 animate-pulse">
                  ● Live
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-slate-900 rounded-lg mb-4 flex items-center justify-center">
              {!isInCall ? (
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">
                    Appointment with {doctorName}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Scheduled for {appointmentTime}
                  </p>
                  <Button onClick={startCall}>
                    <Video className="h-4 w-4 mr-2" />
                    Join Session
                  </Button>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <div className="absolute bottom-4 right-4 bg-slate-800 rounded-lg p-2 w-48 h-36">
                    <div className="w-full h-full bg-slate-700 rounded flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Your Video</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isInCall && (
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleVideo}
                  className={!isVideoOn ? 'bg-red-500/10 text-red-500' : ''}
                >
                  {isVideoOn ? (
                    <Video className="h-4 w-4" />
                  ) : (
                    <VideoOff className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleAudio}
                  className={!isAudioOn ? 'bg-red-500/10 text-red-500' : ''}
                >
                  {isAudioOn ? (
                    <Mic className="h-4 w-4" />
                  ) : (
                    <MicOff className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={endCall}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="h-full">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[calc(100vh-24rem)] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="bg-muted/50 rounded-lg p-3 text-sm"
                >
                  {message}
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-muted/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelemedicineConsult;