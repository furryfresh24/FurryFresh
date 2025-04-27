import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, FlatList, Image } from 'react-native';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { usePet } from '../../../context/pet_context';
import { useSession } from '../../../context/sessions_context';
import { useMessages } from '../../../realtime/messages';
import dimensions from '../../../utils/sizing';
import AppbarDefault from '../../../components/bars/appbar_default';
import { useTyping } from '../../../realtime/typing-status';

const MessageScreen = () => {
    const { pets } = usePet();
    const { session } = useSession();
    const { newMessages, sendMessage, markMessagesAsRead } = useMessages();
    const { typingStatuses, setTypingStatus } = useTyping();
    const { conversationId, otherPetAvatar } = useLocalSearchParams<{ conversationId: string, otherPetAvatar: string }>();

    const [messageInput, setMessageInput] = useState('');
    const [pendingMessages, setPendingMessages] = useState<any[]>([]);

    const flatListRef = useRef<FlatList>(null);
    const myPetIds = pets.map((pet) => pet.id);

    const conversationMessages = useMemo(() => {
        if (!conversationId) return [];
        return [
            ...newMessages
                .filter((msg) => msg.conversation_id === conversationId)
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
            ...pendingMessages
        ];
    }, [newMessages, pendingMessages, conversationId]);

    const isSomeoneTyping = typingStatuses.some(
        (status) =>
            status.conversation_id === conversationId &&
            status.is_typing &&
            !myPetIds.includes(status.sender_pet_id)
    );

    useEffect(() => {
        if (!conversationId) return;
        const hasUnread = conversationMessages.some(
            (msg) => !myPetIds.includes(msg.sender_pet_id) && !msg.is_read
        );
        if (hasUnread) {
            markMessagesAsRead(conversationId);
        }
    }, [conversationMessages, conversationId]);

    const handleSend = async () => {
        if (messageInput.trim().length === 0) return;
        const senderPetId = myPetIds[0];

        const tempMessage = {
            id: `pending-${Date.now()}`,
            conversation_id: conversationId,
            sender_pet_id: senderPetId,
            content: messageInput.trim(),
            created_at: new Date().toISOString(),
            pending: true,
        };

        setPendingMessages((prev) => [...prev, tempMessage]);
        await sendMessage(conversationId, senderPetId, session?.user.id ?? '', messageInput.trim());
        await setTypingStatus(conversationId, senderPetId, false);

        setMessageInput('');
        Keyboard.dismiss();
    };

    useEffect(() => {
        const keyboardListener = Keyboard.addListener('keyboardDidShow', () => {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 10);
        });

        return () => {
            keyboardListener.remove();
        };
    }, []);

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [conversationMessages.length]);

    useEffect(() => {
        if (!pendingMessages.length) return;
        setPendingMessages((pending) =>
            pending.filter((pendingMsg) =>
                !newMessages.some((realMsg) => realMsg.content === pendingMsg.content)
            )
        );
    }, [newMessages]);

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        const isMine = myPetIds.includes(item.sender_pet_id);
        const nextItem = conversationMessages[index + 1];
        const prevItem = conversationMessages[index - 1];
        const isLastOfBlock = !nextItem || nextItem.sender_pet_id !== item.sender_pet_id;
        const isStartOfBlock = !prevItem || prevItem.sender_pet_id !== item.sender_pet_id;

        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: isLastOfBlock ? 10 : 2 }}>
                {!isMine && !isLastOfBlock && <View style={{ width: dimensions.screenWidth * 0.12 }} />}
                {!isMine && isLastOfBlock && (
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: otherPetAvatar }}
                            style={styles.avatar}
                        />
                    </View>
                )}
                <View style={{ flex: 1, alignItems: isMine ? 'flex-end' : 'flex-start' }}>
                    <View style={[
                        { maxWidth: dimensions.screenWidth * 0.65 },
                        isMine ? styles.myMessageBubble : styles.senderMessageBubble,
                        isMine ? styles.myBubble : styles.theirBubble,
                        isStartOfBlock && !isMine && { borderTopLeftRadius: 18, borderTopRightRadius: 20 },
                        isLastOfBlock && !isMine && { borderBottomLeftRadius: 18, borderBottomRightRadius: 20 },
                        isStartOfBlock && isMine && { borderTopRightRadius: 18, borderTopLeftRadius: 20 },
                        isLastOfBlock && isMine && { borderBottomRightRadius: 18, borderBottomLeftRadius: 20 },
                    ]}>
                        <Text style={[styles.messageText, isMine ? styles.myBubbleText : styles.theirBubbleText]}>
                            {item.content}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <AppbarDefault session={session} titleSize={0} leadingChildren={null} showLeading={true} />
            <KeyboardAvoidingView
                style={styles.keyboard}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <FlatList
                    ref={flatListRef}
                    data={conversationMessages}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    contentContainerStyle={styles.contentContainer}
                    renderItem={renderItem}
                    onContentSizeChange={() => {
                        flatListRef.current?.scrollToOffset({ offset: 999999, animated: true });
                    }}
                />
                {isSomeoneTyping && (
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontFamily: 'Poppins-Regular', color: '#888' }}>
                            Typing...
                        </Text>
                    </View>
                )}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message"
                        value={messageInput}
                        onChangeText={(text) => {
                            setMessageInput(text);
                            setTypingStatus(conversationId, myPetIds[0], text.length > 0);
                        }}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default MessageScreen;

const styles = StyleSheet.create({
    avatarContainer: {
        width: dimensions.screenWidth * 0.09,
        height: dimensions.screenWidth * 0.09,
        marginRight: dimensions.screenWidth * 0.03,
        marginBottom: 2,
    },
    avatar: {
        width: dimensions.screenWidth * 0.09,
        height: dimensions.screenWidth * 0.09,
        borderRadius: 100,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    keyboard: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: dimensions.screenWidth * 0.02,
        paddingTop: 10,
        paddingBottom: 20,
    },
    senderMessageBubble: {
        maxWidth: '70%',
        padding: 10,
        paddingHorizontal: dimensions.screenWidth * 0.03,
        borderRadius: 8,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    myMessageBubble: {
        padding: 10,
        paddingHorizontal: dimensions.screenWidth * 0.03,
        borderRadius: 8,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    myBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#4A90E2',
    },
    theirBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5E5',
    },
    myBubbleText: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    theirBubbleText: {
        color: '#000',
        fontFamily: 'Poppins-Regular',
    },
    messageText: {
        fontSize: dimensions.screenWidth * 0.04,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: dimensions.screenWidth * 0.04,
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        fontFamily: 'Poppins-Regular',
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#4A90E2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    sendButtonText: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: dimensions.screenWidth * 0.04,
    },
});
