import { Image, StyleSheet, View, Text, Pressable, Linking } from "react-native";

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#171717",
        width: 350,
        height: 350,
        borderWidth: 3,
    },
    image: {
        width: "100%",
        height: 200,
    },
    textContainer: {
        flex: 1
    },
    titleContainer: {
        backgroundColor: "#242424",
        width: "100%",
        height: "35%",
        paddingHorizontal: 5,
        borderColor: "gray",
        borderBottomWidth: 2,
        justifyContent: "center"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    descriptionContainer: {
        height: "50%",
        backgroundColor: "#171717",
        paddingHorizontal: 5
    },
    description: {
        color: "white"
    },
    dateContainer: {
        height: "15%",
        paddingBottom: 5,
        backgroundColor: "#0f0f0f",
        paddingHorizontal: 5
    },
    date: {
        fontSize: 14,
        color: "white"
    }
})

type card = {
    publishedAt: string
    title: string
    description: string
    url: string
    urlToImage: string
}

const Card = ({ publishedAt, title, description, url, urlToImage }: card) => {

    const date = new Date(publishedAt)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    const formatedDate = `${day}/${month}/${year} ${hours}:${minutes}`

    return (
        <Pressable onPress={() => { Linking.openURL(url) }}>
            <View style={styles.cardContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: urlToImage || "https://firehouseshelter.com/wp-content/themes/kronos/assets/images/news-placeholder.jpg" }}
                    resizeMode="cover"
                />
                <View style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <Text
                            style={styles.title}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {title}
                        </Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text
                            style={styles.description}
                            numberOfLines={4}
                            ellipsizeMode="tail"
                        >
                            {description}
                        </Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{formatedDate}</Text>
                    </View>
                </View>
            </View>
        </Pressable>

    );
}

export default Card;